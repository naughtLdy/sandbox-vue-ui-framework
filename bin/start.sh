#!/bin/bash

echo "start..."

SOURCE=$SANDBOX_VUE_UI_FRAMEWORK_REPO_ROOT/work

cd $SOURCE
npm run build
npm run start
