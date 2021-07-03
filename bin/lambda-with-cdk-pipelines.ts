#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { MainCdkPipelineStack } from "../lib/pipeline-stack";

const app = new cdk.App();
new MainCdkPipelineStack(app, "LambdaWithCdkPipelinesStack", {});
