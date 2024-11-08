const determineProfile = (answers) => {
  const profile = {
    waterUsage: answers.q1,
    meatConsumption: answers.q2,
    reusableBags: answers.q3,
    lightsUsage: answers.q4,
    localProducts: answers.q5,
    wasteSorting: answers.q6,
    ecoSpreading: answers.q7,
  };

  const ecoFriendlyScore = [
    answers.q1 === "Economique",
    answers.q2 === "Jamais",
    answers.q3 === "Toujours",
    answers.q4 === "Jamais",
    answers.q5 === "Toujours",
    answers.q6 === "Toujours",
  ].filter(Boolean).length;

  profile.category =
    ecoFriendlyScore >= 5
      ? "Eco Warrior"
      : ecoFriendlyScore >= 3
      ? "Eco Friendly"
      : "Eco Newbie";

  return profile;
};

const generateTasks = async (profile) => {
  const URL_BACKEND = "https://carby-backend.vercel.app";
  const tasks = [];

  // venir chercher toute les tasks dans la collection tasks et filtrer celles retournées par la fonction generatTasks
  const response = await fetch(`${URL_BACKEND}/tasks/`);
  const data = await response.json();

  if (profile.category === "Eco Warrior") {
    tasks.push(data.tasks[7]);
  } else {
    if (profile.waterUsage !== "Economique") {
      tasks.push(data.tasks[1]);
    }

    if (profile.meatConsumption !== "Jamais") {
      tasks.push(data.tasks[5]);
    }

    if (profile.reusableBags !== "Toujours") {
      tasks.push(data.tasks[6]);
    }

    if (profile.lightsUsage !== "Jamais") {
      tasks.push(data.tasks[4]);
    }

    if (profile.localProducts !== "Toujours") {
      tasks.push(data.tasks[3]);
    }

    if (profile.wasteSorting !== "Toujours") {
      tasks.push(data.tasks[0]);
    }

    if (profile.ecoSpreading !== "Toujours") {
      tasks.push(data.tasks[2]);
    }
  }
  console.log("tasks from userProfile ::::", tasks);
  return tasks;
};
export { generateTasks, determineProfile };
