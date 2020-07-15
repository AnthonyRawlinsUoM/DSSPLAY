all: build dockerize push

build:
	git add .
	git commit -a
	npm version patch
	ng build

dockerize:
	@docker build -t anthonyrawlinsuom/dssplay:latest .

push:
	@docker push anthonyrawlinsuom/dssplay:latest
