build:
	deno compile --allow-run --allow-write --allow-read --output dist/voltage src/index.ts
clean:
	rm -rf dist; mkdir dist