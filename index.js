const { chromium } = require("playwright");
const { wrap, configure } = require("agentql")
require('dotenv').config();

var URL = "http://eaapp.somee.com/Account/Login"


var loginPage = `{
        UserName,
        Password,
        Log_in
}`;

var employeeList = ` {
        EmployeeList
}`

var createNewButton = ` {
        CreateNew
}`

var CreateNewUserPage = ` {
            Name, 
            Salary, 
            DurationWorked,
            Grade,
            Email,
            Create
        }`


async function main() {

  configure({
    apiKey: process.env.AGENTQL_API_KEY, // This is the default and can be omitted.
  });

  const browser = await chromium.launch({ headless: false });

  // Wrap the page to get access to the AgentQL's querying API
  const page = await wrap(await browser.newPage());
  page.setDefaultTimeout(60000);
  // Navigate to the URL
  await page.goto(URL);

  const login = await page.queryElements(loginPage);

  // Fill the username and password fields
  await login.UserName.fill('admin');
  await login.Password.fill('password');

  // Click the submit button
  await login.Log_in.click();

  //Click Employee List
  const employee = await page.queryElements(employeeList);
  await employee.EmployeeList.click();

  //Click Employee List
  const createNew = await page.queryElements(createNewButton);
  await createNew.CreateNew.click();

  const createNewUser = await page.queryElements(CreateNewUserPage);
  await createNewUser.Name.fill("FromAgentQL", { timeout: 10000 });
  await createNewUser.Salary.fill("124233");
  await createNewUser.DurationWorked.fill("8");
  await createNewUser.Email.fill("FromAgentQL@gmail.com");
  await createNewUser.Create.click();

  await browser.close();
}

main()