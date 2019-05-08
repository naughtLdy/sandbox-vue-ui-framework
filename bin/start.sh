#!/bin/bash

echo "start..."

SOURCE=$SANDBOX_VUE_UI_FRAMEWORK_REPO_ROOT/work

cd $SOURCE
npm link sandbox-vue-ui-framework
npm run build
npm run start
