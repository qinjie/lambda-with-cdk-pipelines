#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { LambdaPythonStack } from "../lib/lambda-python-stack";
import { PipelineStack } from "../lib/pipeline-stack";

const APP_NAME = "LambdaWithCdkPipeline";

const app = new cdk.App();

// new LambdaPythonStack(app, "LambdaStack");
new PipelineStack(app, APP_NAME);

app.synth();
