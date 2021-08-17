export function getLibPath(name: string) {
  const [libPrefix, libSuffix] = {
    darwin: ["lib", "dylib"],
    linux: ["lib", "so"],
    windows: ["", "dll"],
  }[Deno.build.os];
  return `${Deno.cwd()}/target/debug/${libPrefix}${name}.${libSuffix}`;
}
