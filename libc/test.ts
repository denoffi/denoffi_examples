import { assertEquals } from "jsr:@std/assert";

Deno.test({
  name: "libc",
  fn() {
    const libName = Deno.build.os === "linux" ? "libc.so.6" : "libc.dylib";
    const lib = Deno.dlopen(libName, {
      abs: { parameters: ["i32"], result: "i32" },
    });

    assertEquals(lib.symbols.abs(-1), 1);
    assertEquals(lib.symbols.abs(2), 2);
    assertEquals(lib.symbols.abs(0), 0);
    assertEquals(lib.symbols.abs(-(2 ** 31 - 1)), 2 ** 31 - 1);
    assertEquals(lib.symbols.abs(-(2 ** 31)), -(2 ** 31));

    lib.close();
  },
  ignore: Deno.build.os === "windows",
});
