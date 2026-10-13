/*
 * ============================================================
 *  JavaScript Essentials 1 | Module 4 Challenge
 *  Festival Access & Crowd Control System
 *  Author: Sijabulile Ncube (s.mabhena@gmail.com)
 *  Run with: node sijabulile-ncube-module4.js
 * ============================================================
 *
 * No functions,forEach,map,filter or reduce.Only Modules 1 to 4.
 * So every decision is made with if/else,switch and loops,and every loop reads the attendees array
 * itself.Nothing is hardcoded for the sample people,so if the lecturer changes someone's age,ticket or spend,
 * or pushes a new attendee,the results update on their own.
 *
 * Each challenge sits inside its own {} block so variable names like count or found don't clash between challenges.
 *
 * MDN pages I learnt  on:
 * for...of:  developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
 * for...in:  developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
 * switch:    developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
 * break:     developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break
 * continue:  developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue
 * do...while: developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while
 */

// ------------------------------------------------------------
// STARTING DATA
// ------------------------------------------------------------
let attendees = [
  { name: "Lebo", age: 22, ticket: "General", hasTicket: true, checkedIn: false, spend: 350 },
  { name: "Aisha", age: 19, ticket: "VIP", hasTicket: true, checkedIn: false, spend: 1200 },
  { name: "Thabo", age: 17, ticket: "General", hasTicket: true, checkedIn: false, spend: 250 },
  { name: "Naledi", age: 25, ticket: "VIP", hasTicket: true, checkedIn: false, spend: 850 },
  { name: "Jason", age: 31, ticket: "General", hasTicket: false, checkedIn: false, spend: 0 },
  { name: "Zanele", age: 20, ticket: "General", hasTicket: true, checkedIn: false, spend: 650 },
  { name: "Karabo", age: 16, ticket: "VIP", hasTicket: true, checkedIn: false, spend: 900 },
  { name: "Michael", age: 28, ticket: "General", hasTicket: true, checkedIn: false, spend: 450 },
];

// SURPRISE TEST: remove the // in front of the next line to add Neo.Everything below picks him up automatically.
// attendees.push({ name: "Neo",age: 23,ticket: "VIP",hasTicket: true,checkedIn: false,spend: 1500 });

// ============================================================
// CHALLENGE 1: View the queue
// ============================================================
{
  console.log("\n########## CHALLENGE 1: VIEW THE QUEUE ##########");

  // for...of hands me one attendee object at a time,so one block of console.logs covers everyone in the array,
  // however many people there are.
  for (const person of attendees) {
    console.log("========================");
    console.log(`Name: ${person.name}`);
    console.log(`Age: ${person.age}`);
    console.log(`Ticket: ${person.ticket}`);
    console.log(`Valid Ticket: ${person.hasTicket}`);
  }
  console.log("========================");
}

// ============================================================
// CHALLENGE 2: Who can enter?
// ============================================================
{
  console.log("\n########## CHALLENGE 2: WHO CAN ENTER? ##########");

  for (const person of attendees) {
    // && because BOTH things must be true.Being 18+ alone isn't enough,and a ticket alone isn't enough.
    if (person.age >= 18 && person.hasTicket === true) {
      console.log(`${person.name} -> ENTRY APPROVED`);
    } else if (person.age < 18 && person.hasTicket === false) {
      // I added this case myself: if the lecturer changes the data so someone fails BOTH checks,
      // I want to show both reasons instead of only the first one.
      console.log(`${person.name} -> ENTRY DENIED: UNDER 18 AND NO VALID TICKET`);
    } else if (person.age < 18) {
      console.log(`${person.name} -> ENTRY DENIED: UNDER 18`);
    } else {
      // If we get here they're 18+ (otherwise an earlier branch would have caught them),so the ticket is the problem.
      console.log(`${person.name} -> ENTRY DENIED: NO VALID TICKET`);
    }
  }
}

// ============================================================
// CHALLENGE 3: Access zones
// ============================================================
{
  console.log("\n########## CHALLENGE 3: ACCESS ZONES ##########");

  for (const person of attendees) {
    // Only people who actually got in receive a wristband,so anyone who fails entry is skipped.
    if (!(person.age >= 18 && person.hasTicket === true)) {
      continue;
    }

    // switch compares person.ticket against each case using strict equality (===).
    let wristband;
    switch (person.ticket) {
      case "VIP":
        wristband = "GOLD";
        break;
      case "General":
        wristband = "BLUE";
        break;
      default:
        // Catches anything unexpected,like a typo "vip" or a new ticket type nobody told security about.
        wristband = "UNKNOWN TICKET TYPE";
    }
    // Without the break after each case,JavaScript would "fall through" and run the next case too.

    console.log(person.name);
    console.log(`Ticket: ${person.ticket}`);
    console.log(`Wristband: ${wristband}`);
    console.log("");
  }
}

// ============================================================
// CHALLENGE 4: VIP lounge security
// ============================================================
{
  console.log("########## CHALLENGE 4: VIP LOUNGE SECURITY ##########");

  for (const person of attendees) {
    // All three conditions must pass.One false and the whole && chain is false.
    if (person.hasTicket === true && person.ticket === "VIP" && person.age >= 18) {
      console.log(`${person.name} -> VIP LOUNGE ACCESS: APPROVED`);
    } else {
      console.log(`${person.name} -> VIP LOUNGE ACCESS: DENIED`);
    }
  }

  /*
   * Why Karabo fails even though he has a VIP ticket:
   * Karabo passes the first two checks (hasTicket is true and ticket is "VIP") but he is 16.
   * The third check,age >= 18,is false,and with && every single condition has to be true.
   * So owning a VIP ticket doesn't override the age rule.The festival is 18+ for everyone,VIP or not.
   */
}

// ============================================================
// CHALLENGE 5: Find a person in the queue
// ============================================================
{
  console.log("\n########## CHALLENGE 5: FIND A PERSON ##########");

  let searchName = "Zanele";

  // This little object lets me use for...in to print the details.The keys match the attendee properties
  // and the values are the labels I want on screen,so the output matches the brief's format.
  const detailLabels = { name: "Name", age: "Age", ticket: "Ticket", hasTicket: "Valid Ticket" };

  let found = false;
  // A normal counting for loop here so I can stop at the exact position with break.
  for (let i = 0; i < attendees.length; i++) {
    // toLowerCase on both sides so "zanele" or "ZANELE" would still match.
    if (attendees[i].name.toLowerCase() === searchName.toLowerCase()) {
      console.log("ATTENDEE FOUND");
      // for...in loops over the KEYS of an object ("name","age",...),not the values.
      for (const key in detailLabels) {
        console.log(`${detailLabels[key]}: ${attendees[i][key]}`);
      }
      found = true;
      // Found them,so there's no point checking the rest of the queue.break exits the loop immediately.
      break;
    }
  }
  if (!found) {
    console.log(`${searchName} is not in the queue.`);
  }

  // Testing several names.I can't use a function (later module),so I put the test names in an array
  // and wrapped the same search in an outer loop.break only exits the INNER loop,so the outer loop moves on to the next name.
  console.log("\n--- Testing more names ---");
  const testNames = ["Aisha", "michael", "Sipho"];
  for (const testName of testNames) {
    searchName = testName;
    found = false;
    for (let i = 0; i < attendees.length; i++) {
      if (attendees[i].name.toLowerCase() === searchName.toLowerCase()) {
        console.log("ATTENDEE FOUND");
        for (const key in detailLabels) {
          console.log(`${detailLabels[key]}: ${attendees[i][key]}`);
        }
        found = true;
        break;
      }
    }
    if (!found) {
      console.log(`${searchName} is not in the queue.`);
    }
    console.log("");
  }
}

// ============================================================
// CHALLENGE 6: Security fast lane
// ============================================================
{
  console.log("########## CHALLENGE 6: SECURITY FAST LANE ##########");

  for (const person of attendees) {
    // No valid ticket? continue skips the rest of THIS loop round and jumps straight to the next person.
    if (person.hasTicket === false) {
      continue;
    }
    console.log(`Checking ${person.name}...`);
  }

  /*
   * Why continue and not break:
   * break would stop the WHOLE loop the moment it reached Jason,so Zanele,Karabo and Michael would never be checked.
   * continue only skips Jason and carries on with the rest of the queue,which is exactly what security wants.
   */
}

// ============================================================
// CHALLENGE 7: Food voucher rewards
// ============================================================
{
  console.log("\n########## CHALLENGE 7: FOOD VOUCHERS ##########");

  for (const person of attendees) {
    let voucher;
    // I check from the HIGHEST amount down.Order matters: if I checked >= 300 first,someone who spent R1200
    // would match that and get only R50,because the first true condition wins and the rest are skipped.
    if (person.spend >= 1000) {
      voucher = "R200 food voucher";
    } else if (person.spend >= 500) {
      voucher = "R100 food voucher";
    } else if (person.spend >= 300) {
      voucher = "R50 food voucher";
    } else {
      voucher = "No voucher";
    }
    // Because the conditions run top to bottom,">= 500" here really means "500 to 999".
    console.log(`${person.name} (spent R${person.spend}) -> ${voucher}`);
  }
}

// ============================================================
// CHALLENGE 8: Festival statistics
// ============================================================
{
  console.log("\n########## CHALLENGE 8: FESTIVAL STATISTICS ##########");

  let validTickets = 0;
  let invalidTickets = 0;
  let under18 = 0;
  let vipCount = 0;
  let generalCount = 0;
  let totalSpend = 0;
  let highestSpender = attendees[0];

  // A classic for loop this time,counting through every position in the array.
  for (let i = 0; i < attendees.length; i++) {
    const person = attendees[i];

    if (person.hasTicket === true) {
      validTickets++;
    } else {
      invalidTickets++;
    }

    if (person.age < 18) {
      under18++;
    }

    // Separate ifs (not else if) because these are different questions.Someone can be under 18 AND hold a VIP ticket.
    if (person.ticket === "VIP") {
      vipCount++;
    } else if (person.ticket === "General") {
      generalCount++;
    }

    totalSpend += person.spend;

    if (person.spend > highestSpender.spend) {
      highestSpender = person;
    }
  }

  // attendees.length is the total,so it's always right even if people are added or removed.
  const totalAttendees = attendees.length;
  const averageSpend = totalSpend / totalAttendees;

  console.log(`Total attendees in queue: ${totalAttendees}`);
  console.log(`Valid tickets: ${validTickets}`);
  console.log(`Invalid tickets: ${invalidTickets}`);
  console.log(`Under 18: ${under18}`);
  console.log(`General ticket holders: ${generalCount}`);
  console.log(`VIP ticket holders: ${vipCount}`);
  console.log(`Total amount spent: R${totalSpend}`);
  console.log(`Average spent per attendee: R${averageSpend.toFixed(2)}`);
  console.log(`Highest spender: ${highestSpender.name} (R${highestSpender.spend})`);
}

// ============================================================
// CHALLENGE 9: Find the biggest spender
// ============================================================
{
  console.log("\n########## CHALLENGE 9: BIGGEST SPENDER ##########");

  // Start by assuming the first person is the biggest spender,then let everyone else challenge them.
  let biggestSpender = attendees[0];

  for (const person of attendees) {
    // If this person spent MORE than the current leader,they become the new leader.
    // I used > rather than >= so that in a tie the person who was in the queue first keeps the title.
    if (person.spend > biggestSpender.spend) {
      biggestSpender = person;
    }
  }

  console.log("===== TOP CUSTOMER =====");
  console.log(`Name: ${biggestSpender.name}`);
  console.log(`Amount Spent: R${biggestSpender.spend}`);
  console.log("Reward: Backstage Upgrade");
}

// ============================================================
// CHALLENGE 10: Venue capacity
// ============================================================
{
  console.log("\n########## CHALLENGE 10: VENUE CAPACITY ##########");

  let capacity = 5;
  let peopleInside = 0;
  let index = 0;

  // A while loop,because I don't know in advance how many people I'll get through before the venue fills up.
  while (index < attendees.length) {
    const person = attendees[index];
    index++; // move the counter forward FIRST,so I can't accidentally create an endless loop below

    if (person.age >= 18 && person.hasTicket === true) {
      peopleInside++;
      person.checkedIn = true;
      console.log(`${person.name} entered.`);
      console.log(`People inside: ${peopleInside} / ${capacity}`);

      // >= instead of === as a safety net: even if capacity were changed to 0 or something odd,
      // the venue can never end up with more people than it's allowed.
      if (peopleInside >= capacity) {
        console.log("VENUE FULL");
        console.log("STOP ADMITTING PEOPLE");
        break;
      }
    } else {
      console.log(`${person.name} not admitted (must be 18+ with a valid ticket).`);
    }
  }

  // If the whole queue was processed without filling up,say so.
  if (peopleInside < capacity) {
    console.log(`Queue finished.${peopleInside} / ${capacity} inside,venue not full.`);
  }
}

// ============================================================
// CHALLENGE 11: Closing time countdown
// ============================================================
{
  console.log("\n########## CHALLENGE 11: CLOSING TIME COUNTDOWN ##########");

  // I used a do...while here so I'd have one in the project.The body runs first,then the condition is checked.
  let minutesLeft = 10;
  do {
    // "minute" for 1 and "minutes" for everything else.
    if (minutesLeft === 1) {
      console.log(`Festival closes in ${minutesLeft} minute...`);
    } else {
      console.log(`Festival closes in ${minutesLeft} minutes...`);
    }

    if (minutesLeft === 5) {
      console.log("WARNING: LAST ENTRY HAS ENDED");
    } else if (minutesLeft === 2) {
      console.log("PLEASE PROCEED TO THE EXIT");
    }

    minutesLeft--;
  } while (minutesLeft >= 1);

  console.log("FESTIVAL CLOSED");
}

// ============================================================
// FINAL CHALLENGE: Festival control dashboard
// ============================================================
{
  console.log("\n########## FINAL CHALLENGE: CONTROL DASHBOARD ##########");

  // Change this number (1 to 7) to run a different part of the dashboard.
  let option = 2;

  console.log("================================");
  console.log("        FESTIVAL CONTROL");
  console.log("================================");
  console.log("1 - View Attendee Queue");
  console.log("2 - Process Entry");
  console.log("3 - View VIP Guests");
  console.log("4 - View Denied Attendees");
  console.log("5 - View Festival Statistics");
  console.log("6 - Find Biggest Spender");
  console.log("7 - Close Festival");
  console.log("================================");
  console.log(`Selected option: ${option}\n`);

  // switch suits a menu: one value (option) compared against a list of fixed choices.
  // Since functions are a later module,each case has its own loop that actually does the job.
  switch (option) {
    case 1:
      console.log("ATTENDEE QUEUE");
      for (const person of attendees) {
        console.log(`${person.name} | Age ${person.age} | ${person.ticket} | Valid ticket: ${person.hasTicket}`);
      }
      break;

    case 2:
      console.log("PROCESSING ENTRY");
      for (const person of attendees) {
        if (person.age >= 18 && person.hasTicket === true) {
          console.log(`${person.name} -> ENTRY APPROVED`);
        } else if (person.age < 18 && person.hasTicket === false) {
          console.log(`${person.name} -> ENTRY DENIED: UNDER 18 AND NO VALID TICKET`);
        } else if (person.age < 18) {
          console.log(`${person.name} -> ENTRY DENIED: UNDER 18`);
        } else {
          console.log(`${person.name} -> ENTRY DENIED: NO VALID TICKET`);
        }
      }
      break;

    case 3:
      // Only ELIGIBLE VIPs: same three checks as the VIP lounge in Challenge 4.
      console.log("ELIGIBLE VIP GUESTS");
      let vipGuestsFound = 0;
      for (const person of attendees) {
        if (person.hasTicket === true && person.ticket === "VIP" && person.age >= 18) {
          console.log(`- ${person.name}`);
          vipGuestsFound++;
        }
      }
      if (vipGuestsFound === 0) {
        console.log("No eligible VIP guests.");
      }
      break;

    case 4:
      console.log("DENIED ATTENDEES");
      for (const person of attendees) {
        // Approved people are skipped,so only denied people and their reasons are shown.
        if (person.age >= 18 && person.hasTicket === true) {
          continue;
        }
        if (person.age < 18 && person.hasTicket === false) {
          console.log(`${person.name}: UNDER 18 AND NO VALID TICKET`);
        } else if (person.age < 18) {
          console.log(`${person.name}: UNDER 18`);
        } else {
          console.log(`${person.name}: NO VALID TICKET`);
        }
      }
      break;

    case 5:
      console.log("FESTIVAL STATISTICS");
      let valid = 0;
      let invalid = 0;
      let minors = 0;
      let vips = 0;
      let generals = 0;
      let spendTotal = 0;
      for (const person of attendees) {
        if (person.hasTicket === true) {
          valid++;
        } else {
          invalid++;
        }
        if (person.age < 18) {
          minors++;
        }
        if (person.ticket === "VIP") {
          vips++;
        } else if (person.ticket === "General") {
          generals++;
        }
        spendTotal += person.spend;
      }
      console.log(`Total attendees: ${attendees.length}`);
      console.log(`Valid tickets: ${valid} | Invalid tickets: ${invalid}`);
      console.log(`Under 18: ${minors}`);
      console.log(`VIP: ${vips} | General: ${generals}`);
      console.log(`Total spent: R${spendTotal} | Average: R${(spendTotal / attendees.length).toFixed(2)}`);
      break;

    case 6:
      let topSpender = attendees[0];
      for (const person of attendees) {
        if (person.spend > topSpender.spend) {
          topSpender = person;
        }
      }
      console.log("===== TOP CUSTOMER =====");
      console.log(`Name: ${topSpender.name}`);
      console.log(`Amount Spent: R${topSpender.spend}`);
      console.log("Reward: Backstage Upgrade");
      break;

    case 7:
      for (let minutes = 10; minutes >= 1; minutes--) {
        console.log(`Festival closes in ${minutes} ${minutes === 1 ? "minute" : "minutes"}...`);
        if (minutes === 5) {
          console.log("WARNING: LAST ENTRY HAS ENDED");
        } else if (minutes === 2) {
          console.log("PLEASE PROCEED TO THE EXIT");
        }
      }
      console.log("FESTIVAL CLOSED");
      break;

    default:
      // Anything that isn't 1 to 7 ends up here instead of silently doing nothing.
      console.log("INVALID OPTION.Please choose a number from 1 to 7.");
  }
}

/*
 * ============================================================
 * SUBMISSION QUESTIONS
 * ============================================================
 *
 * 1.Why did you use && for festival entry?
 *    Because entry has two rules that BOTH have to be true: age >= 18 and hasTicket === true.
 *    && only gives true when every condition is true.If I'd used ||,a 16 year old with a ticket
 *    or an adult with no ticket would get in,because || only needs one condition to pass.
 *
 * 2.Where did you use else if and why?
 *    In Challenge 2 (and dashboard options 2 and 4) to pick the right denial reason,and in Challenge 7 for the voucher tiers.
 *    else if is for choices where only ONE outcome should happen.JavaScript checks each condition from the top
 *    and stops at the first true one.That's why the voucher conditions go from highest to lowest:
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
 */
