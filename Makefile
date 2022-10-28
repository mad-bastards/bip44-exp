export NODE_OPTIONS=--openssl-legacy-provider
SHELL:=/bin/bash
NODE:=$(shell type -p node)
MAKEFLAGS:=-rR

all:
	@echo index.mjs:1:running
	${NODE} index.mjs

tests:
	${NODE} tests/genBTC.mjs

.PHONY: all tests
