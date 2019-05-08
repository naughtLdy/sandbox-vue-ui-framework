#!/bin/bash

echo "building sfc..."

SOURCE=$SANDBOX_VUE_UI_FRAMEWORK_REPO_ROOT/sfc/sandbox-vue-ui-framework

cd $SOURCE
npm run build
npm link

echo "DONE"

