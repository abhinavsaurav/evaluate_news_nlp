import "@babel/polyfill";
import { handleSubmit, postData } from "./../client/js/formHandler";

describe('Test, the function "handleSubmit()" should exist', () => {
	test("It should return true", async () => {
		expect(handleSubmit).toBeDefined();
	});
});
