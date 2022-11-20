export NODE_OPTIONS=--openssl-legacy-provider
SHELL:=/bin/bash
NODE:=$(shell type -p vi_node)
MAKEFLAGS:=-rR

all:
	@echo index.mjs:1:running
	set pipefail; ${NODE} index.mjs 2>&1 | tee node.out 2>&1 | less -S

tests:
	${NODE} tests/genBTC.mjs

.PHONY: all tests
