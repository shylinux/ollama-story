binarys = bin/ice.bin
version = src/version.go
binpack = src/binpack.go
flags = -ldflags "-w -s" -v

all: def
	@date +"%Y-%m-%d %H:%M:%S"
	go build ${flags} -o ${binarys} src/main.go ${version} ${binpack} && ./${binarys} forever restart &>/dev/null

def:
	@[ -f ${version} ] || echo "package main">${version}
	@[ -f ${binpack} ] || echo "package main">${binpack}