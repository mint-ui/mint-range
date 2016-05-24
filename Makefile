.PHONY: dist

dev:
	@cooking watch -c cooking.demo.js

dist:
	@cooking build -c cooking.conf.js

deploy:
	@cooking build -c cooking.demo.js
	./node_modules/.bin/gh-pages -d example/dist
