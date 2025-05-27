import { assertEquals } from "jsr:@std/assert";
import { getLibPath } from "../utils.ts";

Deno.test("add", () => {
  const lib = Deno.dlopen(getLibPath("add"), {
    add: { parameters: ["u32", "u32"], result: "u32" },
  });

  assertEquals(lib.symbols.add(1, 1), 2);
  assertEquals(lib.symbols.add(0, 0), 0);
  assertEquals(lib.symbols.add(2 ** 32 - 1, 0), 2 ** 32 - 1);
  assertEquals(lib.symbols.add(2 ** 31, 2 ** 31 - 1), 2 ** 32 - 1);

  assertEquals(
    lib.symbols.add(
      0b10001000_10000000_11111111_00000000,
      0b00101000_11100000_01000000_00000001,
    ),
    0b10110001_01100001_00111111_00000001,
  );

  lib.close();
});
