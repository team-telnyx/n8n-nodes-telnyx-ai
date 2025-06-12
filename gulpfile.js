const path = require('path');
const { task, src, dest, watch, series } = require('gulp');
const { spawn } = require('child_process');

let n8nProcess = null;

task('build:icons', copyIcons);
task('dev', devMode);

function copyIcons() {
	const nodeSource = path.resolve('nodes', '**', '*.{png,svg}');
	const nodeDestination = path.resolve('dist', 'nodes');

	src(nodeSource).pipe(dest(nodeDestination));

	const credSource = path.resolve('credentials', '**', '*.{png,svg}');
	const credDestination = path.resolve('dist', 'credentials');

	return src(credSource).pipe(dest(credDestination));
}

function startN8nServer() {
	// Kill existing n8n process if it exists
	if (n8nProcess) {
		console.log('🔄 Stopping existing n8n server...');
		return new Promise((resolve) => {
			n8nProcess.on('exit', () => {
				n8nProcess = null;
				// Wait a bit more to ensure port is fully released
				setTimeout(() => {
					startNewN8nProcess();
					resolve();
				}, 1000);
			});
			n8nProcess.kill('SIGTERM');
		});
	} else {
		startNewN8nProcess();
	}
}

function startNewN8nProcess() {
	// Start new n8n server using locally installed n8n
	console.log('🚀 Starting n8n server...');
	n8nProcess = spawn('n8n', ['start'], {
		stdio: 'inherit', // This will show n8n output in your terminal
		shell: true,
	});

	n8nProcess.on('error', (err) => {
		console.error('❌ Failed to start n8n server:', err);
	});

	n8nProcess.on('exit', (code, signal) => {
		if (signal !== 'SIGTERM') {
			console.log(`⚠️ n8n server exited with code ${code}`);
		}
		n8nProcess = null;
	});
}

function devMode(done) {
	console.log('🚀 Starting development mode...');

	// Copy icons initially
	copyIcons();

	// Start TypeScript compiler in watch mode
	const tscWatch = spawn('npx', ['tsc', '--watch'], {
		stdio: 'pipe',
		shell: true,
	});

	let isFirstCompilation = true;

	// Watch for tsc output to detect successful compilations
	tscWatch.stdout.on('data', (data) => {
		const output = data.toString();

		// Show tsc output (optional, comment out if too verbose)
		process.stdout.write(`TSC: ${output}`);

		// Check if compilation was successful
		if (output.includes('Found 0 errors') || output.includes('Compilation complete')) {
			console.log('✅ TypeScript compilation successful!');

			if (isFirstCompilation) {
				console.log('🎯 Initial compilation complete, starting n8n server...');
				isFirstCompilation = false;
			} else {
				console.log('🔄 Code changes detected, restarting n8n server...');
			}

			// Restart n8n server (handle async properly)
			const result = startN8nServer();
			if (result instanceof Promise) {
				result.catch((err) => console.error('Error restarting n8n:', err));
			}
		}
	});

	tscWatch.stderr.on('data', (data) => {
		process.stderr.write(`TSC Error: ${data}`);
	});

	// Handle graceful shutdown
	process.on('SIGINT', () => {
		console.log('\n👋 Shutting down development mode...');

		// Kill TypeScript compiler
		if (tscWatch) {
			tscWatch.kill('SIGTERM');
		}

		// Kill n8n server
		if (n8nProcess) {
			console.log('🛑 Stopping n8n server...');
			n8nProcess.kill('SIGTERM');
		}

		process.exit(0);
	});

	// Handle other termination signals
	process.on('SIGTERM', () => {
		console.log('\n👋 Received SIGTERM, shutting down...');
		if (tscWatch) tscWatch.kill('SIGTERM');
		if (n8nProcess) n8nProcess.kill('SIGTERM');
		process.exit(0);
	});
}
