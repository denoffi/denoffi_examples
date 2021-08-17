import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";

Deno.test({
  name: "libc",
  fn() {
    const libNmae = Deno.build.os === "linux" ? "libc.so" : "libc.dylib";
    const lib = Deno.dlopen(libNmae, {
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
