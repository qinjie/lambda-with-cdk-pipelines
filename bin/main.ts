#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { PipelineStack } from "../lib/pipeline-stack";

// Load .env file
require("dotenv").config();

const MODULE_NAME = process.env.MODULE_NAME || "MyCdkApp";

const app = new cdk.App();
new PipelineStack(app, MODULE_NAME, {
  tags: {
    PROJECT_NAME: process.env.PROJECT_NAME!,
    MODULE_NAME: process.env.MODULE_NAME!,
    MODULE_OWNER: process.env.MODULE_OWNER!,
  },
});

app.synth();
