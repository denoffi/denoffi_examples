import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { getLibPath } from "../utils.ts";

Deno.test("buf", () => {
  const lib = Deno.dlopen(getLibPath("buf"), {
    print_buffer: { parameters: ["pointer", "usize"], result: "void" },
  });

  const buffer = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
  const result = lib.symbols.print_buffer(buffer, buffer.length);

  assertEquals(result, null);

  lib.close();
});
