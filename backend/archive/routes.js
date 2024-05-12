router.post("/payst", async (req, res) => {
    try {
      let components = [];
  
      Object.entries(req.body.componentStatus).map(([component, status]) => {
        if (status) components.push(component);
      });
      console.log(components);
  
      const payStructure = new PayStructure({
        unitId: req.body.unitId,
        components: components,
      });
  
      console.log(payStructure);
  
      await payStructure.save();
  
      res.status(200).send({ data: "Post Successful" });
    } catch (error) {
      console.log("Server-Error");
      console.log(error);
      res.status(500).send({ data: "Post Failure : " + error });
    }
  });
  
  router.get("/payst/:unitId", async (req, res) => {
    try {
      const payStructure = await PayStructure.find({ unitId: req.params.unitId });
      console.log(payStructure);
      res.setHeader("Content-Type", "application/json; charset=UTF-8");
  
      res.status(200).send(payStructure);
    } catch (error) {
      console.log("Server-Error");
      console.log(error);
  
      res.status(500).send({ data: "Get Failure : " + error });
    }
  });
  
  router.get("/emp/:id", async (req, res) => {
    try {
      const employee = await Employee.find({ id: req.params.id });
      res.setHeader("Content-Type", "application/json; charset=UTF-8");
  
      res.status(200).send(employee);
    } catch (error) {
      console.log("Server-Error");
      console.log(error);
  
      res.status(500).send({ data: "Get Failure : " + error });
    }
  });
  
  router.get("/empsal/:id", async (req, res) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/app/emp/${req.params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
  
      const data = await response.json();
      res.status(200).send({ salary: data[0].salary });
    } catch (error) {
      console.log("Server-Error");
      console.log(error);
      res.status(500).send({ data: "Get Failure : " + error });
    }
  });
  
  router.get("/components", async (req, res) => {
    try {
      let componentStatus = {};
      Object.keys(Components).map((component) => {
        componentStatus[component] = false;
      });
  
      res.status(200).send(componentStatus);
    } catch (error) {
      console.log("Server-error");
      console.log(error);
      res.status(500).send({ data: "Get Failure : " + error });
    }
  });
  
  const getSalary = async (req) => {
    const response = await fetch(
      `http://127.0.0.1:3000/app/payst/${req.body.unitId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
  
    const data = await response.json();
    console.log("data");
    console.log(data);
    console.log("data[0].components");
    console.log(data[0].components);
    let _salary = 0;
    for (const component of data[0].components) {
      // console.log(component)
      // console.log(typeof Components[component])
      // console.log(req.body.experience)
      let temp = Components[component](req.body.experience, req.body.experience);
      // console.log(temp)
      _salary += temp;
    }
    return _salary;
  };