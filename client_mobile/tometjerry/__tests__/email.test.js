import mail from "../components/controllers/email";

test("email in good shape", () => {
  expect(mail("toto@gmail.com")).toBe(true);
});
test("email in good shape", () => {
  expect(mail("toto@gmail.fr")).toBe(true);
});
test("email in good shape", () => {
  expect(mail("toto@gmail")).toBe(false);
});
test("email in good shape", () => {
  expect(mail("toto@@gmail.com")).toBe(false);
});
test("email in good shape", () => {
  expect(mail("toto@gmail@com")).toBe(false);
});
test("email in good shape", () => {
  expect(mail("toto.com@gmail..com")).toBe(true);
});
