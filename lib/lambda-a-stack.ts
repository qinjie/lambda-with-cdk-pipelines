import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as lambda_python from "@aws-cdk/aws-lambda-python";
import * as path from "path";

export class LambdaAlphaStack extends cdk.Stack {
  output: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const func = new lambda_python.PythonFunction(this, "FunctionAlpha", {
      entry: path.join(__dirname, "../lambda/app-alpha"),
      index: "main.py",
      handler: "handler",
      runtime: lambda.Runtime.PYTHON_3_8,
      memorySize: 256,
      timeout: cdk.Duration.seconds(10),
    });

    this.output = new cdk.CfnOutput(this, "FunctionAlphaName", {
      value: func.functionName,
    });
  }
}
