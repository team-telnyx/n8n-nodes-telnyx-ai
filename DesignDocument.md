# Design Document

## Overview

This document outlines the design of the Telnyx AI node for n8n.

## Architecture

### Node Structure

The node is structured as a REST API node, with the following endpoints:

### Thoughts

- The node is a REST API node, but it all starts with the `Resource` property.

Telnyx AI node should access which resources to do what ?

The most important question ☝🏼.

First and foremost is Voice and then Chat

For the Voice `Resource` we have the following `Operations`:

1. Getting the voices available: [Get Voices](https://api.telnyx.com/v2/text-to-speech/voices)
2. Generating text to speech: [Generate text to speech](https://api.telnyx.com/v2/text-to-speech/speech)
3. Getting speech to text: [Generate speech to text](https://api.telnyx.com/v2/ai/audio/transcriptions)

For the Chat `Resource` we have the following `Operations`:

1. Getting the models available: [Get All Models](https://api.telnyx.com/v2/ai/models)
