const { DynamicFormService } = require("../../../services/resources");

const all = async (req, res) => {
  try {
    const { offset, limit, sort, ...query } = req.query;

    const { docs, pages, total } = await DynamicFormService.all(
      query,
      offset,
      limit,
      sort
    );

    res.status(200).send({ data: docs, pages, total });
  } catch (error) {
    res.status(400).send(error);
  }
};

const create = async (req, res) => {
  try {
    const dynamicForm = await DynamicFormService.create(req.body);
    dynamicForm
      ? res.status(201).send({ dynamicForm })
      : res.status(400).send({ message: "Dynamic Form is not created" });
  } catch (error) {
    res.status(400).send(error);
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const dynamicForm = await DynamicFormService.findById(id);
    dynamicForm
      ? res.status(200).send({ dynamicForm })
      : res.status(400).send({ message: "dynamicForm not found" });
  } catch (error) {
    res.status(400).send(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const dynamicForm = await DynamicFormService.update(req.body, { id });
    dynamicForm
      ? res.status(200).send({ dynamicForm })
      : res.status(400).send({ message: "dynamicForm is not updated" });
  } catch (error) {
    res.status(400).send(error);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await DynamicFormService.delete({ id });
    res.status(200).send({ message: "dynamicForm is deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  all,
  create,
  show,
  update,
  destroy,
};
