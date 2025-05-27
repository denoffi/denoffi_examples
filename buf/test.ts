import { assertEquals } from "jsr:@std/assert";
import { getLibPath } from "../utils.ts";

Deno.test("buf", () => {
  const lib = Deno.dlopen(getLibPath("buf"), {
    print_buffer: { parameters: ["buffer", "usize"], result: "void" },
  });

  const buffer = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
  const result = lib.symbols.print_buffer(
    buffer,
    buffer.length as unknown as bigint,
  );

  assertEquals(result, undefined);

  lib.close();
});
