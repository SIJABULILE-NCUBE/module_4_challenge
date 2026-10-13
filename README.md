# Festival Access & Crowd Control System

**Name:** Sijabulile Ncube
**Email:** s.mabhena@gmail.com

**Summary:** My JavaScript Essentials 1 Module 4 challenge,a festival access system that uses loops,if/else,switch,break and continue to decide who can enter,who gets VIP access and food vouchers,and when the venue is full,all calculated from the attendee data so it still works when the data changes.

## Files

- `sijabulile-ncube-module4.js`: all 11 challenges,the Festival Control Dashboard and the submission questions (answered at the bottom of the file)
- `index.html`: a simple page that loads the JavaScript file so it can also be run in the browser

## How to run

- In the terminal: `node sijabulile-ncube-module4.js`
- In the browser: open `index.html`,then press F12 and click the **Console** tab to see the output

## Testing with changed data

- **Surprise test:** remove the `//` in front of the `attendees.push(...)` line near the top of the file to add Neo
- **Dashboard:** change `let option = 2;` to any number from 1 to 7

 ## SUBMISSION QUESTIONS
 
 * 1.Why did you use && for festival entry?
     Because entry has two rules that BOTH have to be true: age >= 18 and hasTicket === true.
   && only gives true when every condition is true.If I'd used ||,a 16 year old with a ticket
    or an adult with no ticket would get in,because || only needs one condition to pass.
 
 * 2.Where did you use else if and why?
    In Challenge 2 (and dashboard options 2 and 4) to pick the right denial reason,and in Challenge 7 for the voucher tiers.
   else if is for choices where only ONE outcome should happen.JavaScript checks each condition from the top
   and stops at the first true one.That's why the voucher conditions go from highest to lowest:
 *    someone who spent R1200 must hit the R200 voucher first,not fall into the R50 one.
 *
 * 3.Why is switch appropriate for the control menu?
 *    A menu is one value (option) being compared against a fixed list of exact choices: 1,2,3 and so on.
 *    That's exactly what switch is built for.It's easier to read than seven else ifs in a row,
 *    each case is clearly labelled,and default catches any number that isn't on the menu.
 *
 * 4.What is the difference between break in the search and continue in the security check?
 *    break stops the loop completely.In the search,once I've found Zanele there's no reason to keep looking.
 *    continue only skips the current round and moves on to the next person.In the security check I want to
 *    skip Jason but still check everyone behind him.If I'd used break there,everyone after Jason would be ignored.
 *
 * 5.How did you determine the biggest spender?
 *    I started with biggestSpender = attendees[0],then looped through everyone and compared their spend
 *    to the current biggest.Whenever someone spent more,they replaced the current leader.
 *    By the end of the loop,whoever is left holding the title spent the most.Because the program compares
 *    the numbers itself,changing anyone's spend or adding Neo (R1500) automatically changes the answer.
 *
 * 6.How did you prevent the venue from exceeding capacity?
 *    Every time someone is admitted I add 1 to peopleInside and then check if peopleInside >= capacity.
 *    The moment that's true I print VENUE FULL and use break to stop processing the queue,
 *    so nobody else can be admitted.I used >= instead of === as a safety net in case capacity is set strangely.
 *
 * 7.What would happen if another 20 attendees were added to the array?
 *    Everything would still work without changing any code.Every loop runs until it reaches attendees.length,
 *    so the queue list,entry checks,wristbands,vouchers,statistics and biggest spender would all include
 *    the new people.The capacity check would still stop at 5 (or whatever capacity is set to).
 *
 * 8.Which part of the project required the most problem solving?
 *    The dashboard,because I couldn't use functions.I had to repeat the logic from earlier challenges inside
 *    each case,which made me think about which variables each case needed and why let/const inside a case
 *    can clash with other cases.Testing several names in Challenge 5 without a function was also tricky,
 *    until I realised I could put the names in an array and wrap the search in an outer loop.
 
