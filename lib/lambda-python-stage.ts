import * as cdk from "@aws-cdk/core";
import { CfnOutput } from "@aws-cdk/core";
import { LambdaPythonStack } from "./lambda-python-stack";

export class LambdaPythonStage extends cdk.Stage {
  STACK_NAME = "LambdaPython";
  output: CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    const service = new LambdaPythonStack(this, this.STACK_NAME, {
      tags: {
        Application: this.STACK_NAME,
        Environment: id,
      },
    });

    this.output = service.output;
  }
}
