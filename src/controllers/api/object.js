/**
 * General controller for our API
 */

import { getConnection } from 'typeorm';

export const addObject = async (entityName, req, res, next) => {
  try {
    // change the name so it can be used in output
    const readableEntityName = entityName.toLowerCase();

    // get the repository
    const repository = getConnection().getRepository(entityName);

    // get all the properties from the object
    const validProperties = repository.metadata.propertiesMap;

    // check if the object exists
    const object = await repository.findOne({
      where: {
        name: req.body.name,
      },
    });

    const validKeys = Object.keys(validProperties).sort();
    const objectKeys = Object.keys(req.body).sort();
    objectKeys.forEach((key) => {
      if (!validKeys.includes(key)) {
        req.status(400).json({
          status: `Please only provide valid properties ${key} is not a valid property.`,
        });
      }
    });

    // check if the object already exists
    if (object) {
      req.status(400).json({
        status: `there already exists an ${readableEntityName} under the name: ${req.body.name}.`,
      });
    }

    repository.save({
      ...req.body,
    });
  } catch (e) {
    next(e.message);
  }
};

export const updateObject = async (entityName, req, res, next) => {
  try {
    // change the name so it can be used in output
    const readableEntityName = entityName.toLowerCase();

    // get the repository
    const repository = getConnection().getRepository(entityName);

    // get all the properties from the object
    const validProperties = repository.metadata.propertiesMap;

    // get the relations from the repository
    const { relations } = repository.metadata;
    const relationsArray = relations.map((relation) => relation.propertyName);

    // check if the object exists
    const object = await repository.findOne({
      relations: relationsArray,
      where: {
        id: req.body.id,
      },
    });

    const validKeys = Object.keys(validProperties).sort();
    const objectKeys = Object.keys(req.body).sort();
    objectKeys.forEach((key) => {
      if (!validKeys.includes(key)) {
        return res.status(400).json({
          status: `Please only provide valid properties ${key} is not a valid property.`,
        });
      }
    });

    // check if the object exists
    if (!object) {
      return res.status(400).json({
        status: `there is no ${readableEntityName} with id: ${req.body.id}.`,
      });
    }

    await repository.remove({ id: req.body.id });
    repository.save({
      ...object,
      ...req.body,
    });
  } catch (e) {
    next(e.message);
  }
};

export const deleteObject = async (entityName, req, res, next) => {
  try {
    // change the name so it can be used in output
    const readableEntityName = entityName.toLowerCase();

    // get the id from the request variables
    const { id } = req.params;

    // validate incoming variables
    if (!id)
      throw new Error(`Please provide an id to remove ${readableEntityName}.`);

    // get the repository
    const repository = getConnection().getRepository(entityName);

    // check if the id exists
    const object = await repository.findOne({ id });

    if (!object)
      throw new Error(
        `The ${readableEntityName} with id ${id} does not exist.`
      );

    // remove the object
    await repository.remove({ id });

    // send a success message
    res
      .status(200)
      .json({ status: `Deleted ${readableEntityName} with id ${id}.` });
  } catch (e) {
    next(e.message);
  }
};

export const getObject = async (entityName, req, res, next) => {
  try {
    // get the id from the request variables
    const { id, userId } = req.params;

    // get the repository
    const repository = getConnection().getRepository(entityName);

    // get the relations from the repository
    const { relations } = repository.metadata;
    const relationsArray = relations.map((relation) => relation.propertyName);

    // check if there is an id present if not return the whole list
    if (!id || !userId) {
      return res.status(200).json(
        await repository.find({
          relations: [...relationsArray],
        })
      );
    }
    if (!userId)
      // return the object based on id
      return res.status(200).json(
        await repository.findOne({
          relations: [...relationsArray],
          where: {
            id: req.body.id,
          },
        })
      );

    if (!id) {
      // return the object based on userId
      return res.status(200).json(
        await repository.findOne({
          relations: [...relationsArray],
          where: {
            id: req.body.userId,
          },
        })
      );
    }
  } catch (e) {
    next(e.message);
  }
};
