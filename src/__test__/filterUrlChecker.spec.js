import { checkForURL } from "./../client/js/urlChecker";

describe("Filter function", () => {
	test("it should test the inputtest for link", () => {
		const input = "https://www.successconsciousness.com/index_00003a.htm";

		const output = true;

		expect(checkForURL(input)).toEqual(output);
	});
});
