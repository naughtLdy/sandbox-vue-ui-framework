#!/bin/bash

echo "building vuefile..."

SOURCE=$SANDBOX_VUE_UI_FRAMEWORK_REPO_ROOT/vuefile/sandbox-vue-ui-framework
WORK_NODE_MODULES=$SANDBOX_VUE_UI_FRAMEWORK_REPO_ROOT/work/node_modules/

cd $WORK_NODE_MODULES
unlink sandbox-vue-ui-framework
ln -s $SOURCE

echo "DONE"
