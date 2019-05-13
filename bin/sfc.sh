#!/bin/bash

echo "building sfc..."

SOURCE=$SANDBOX_VUE_UI_FRAMEWORK_REPO_ROOT/sfc/sandbox-vue-ui-framework
WORK_NODE_MODULES=$SANDBOX_VUE_UI_FRAMEWORK_REPO_ROOT/work/node_modules/

cd $SOURCE
npm run build

cd $WORK_NODE_MODULES
unlink sandbox-vue-ui-framework
ln -s $SOURCE

echo "DONE"
