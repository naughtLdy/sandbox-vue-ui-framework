#!/bin/bash

echo "init..."

SOURCE=$SANDBOX_VUE_UI_FRAMEWORK_REPO_ROOT/sfc/sandbox-vue-ui-framework

cd $SANDBOX_VUE_UI_FRAMEWORK_REPO_ROOT/work
npm i
cd $SANDBOX_VUE_UI_FRAMEWORK_REPO_ROOT/sfc/sandbox-vue-ui-framework
npm i

echo "DONE"
