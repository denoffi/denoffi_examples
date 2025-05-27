export function getLibPath(name: string) {
  const [libPrefix, libSuffix] = {
    windows: ["", "dll"],
    darwin: ["lib", "dylib"],
    linux: ["lib", "so"],
    aix: ["lib", "so"],
    freebsd: ["lib", "so"],
    android: ["lib", "so"],
    illumos: ["lib", "so"],
    netbsd: ["lib", "so"],
    solaris: ["lib", "so"],
  }[Deno.build.os];
  return `${Deno.cwd()}/target/debug/${libPrefix}${name}.${libSuffix}`;
}
