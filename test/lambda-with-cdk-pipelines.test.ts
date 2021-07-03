import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as LambdaWithCdkPipelines from "../lib/pipeline-stack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new LambdaWithCdkPipelines.PipelineStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
