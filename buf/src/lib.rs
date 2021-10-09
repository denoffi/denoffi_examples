use std::thread::sleep;
use std::time::Duration;

#[allow(clippy::not_unsafe_ptr_arg_deref)]
#[no_mangle]
pub extern "C" fn print_buffer(ptr: *const u8, len: usize) {
  let buf = unsafe { std::slice::from_raw_parts(ptr, len) };
  println!("{:?}", buf);
}

#[no_mangle]
pub extern "C" fn sleep_blocking(ms: u64) {
  let duration = Duration::from_millis(ms);
  sleep(duration);
}

#[allow(clippy::not_unsafe_ptr_arg_deref)]
#[no_mangle]
pub extern "C" fn nonblocking_buffer(ptr: *const u8, len: usize) {
  let buf = unsafe { std::slice::from_raw_parts(ptr, len) };
  assert_eq!(buf, vec![1, 2, 3, 4, 5, 6, 7, 8]);
}
