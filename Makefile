SANDBOX_VUE_UI_FRAMEWORK_REPO_ROOT ?= $(shell pwd)

.DEFAULT_GOAL := help

.PHONY: help
help: ## show this help message.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: init
init:
	cd work
	npm i
	cd ../

.PHONY: sfc
sfc:
	SANDBOX_VUE_UI_FRAMEWORK_REPO_ROOT=${SANDBOX_VUE_UI_FRAMEWORK_REPO_ROOT} ./bin/sfc.sh

.PHONE: start
start:
	SANDBOX_VUE_UI_FRAMEWORK_REPO_ROOT=${SANDBOX_VUE_UI_FRAMEWORK_REPO_ROOT} ./bin/start.sh
