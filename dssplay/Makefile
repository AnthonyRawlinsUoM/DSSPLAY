all: build dockerize push

build:
	npm version patch
	ng build

dockerize:
	@docker build -t anthonyrawlinsuom/dssplay:latest .

push:
	@docker push anthonyrawlinsuom/dssplay:latest
