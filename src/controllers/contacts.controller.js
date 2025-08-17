import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  patchContact,
} from '../services/contacts.service.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { isFavourite, type } = parseFilterParams(req.query);
  const userId = req.user._id;

  const result = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    isFavourite,
    type,
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    result,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const result = await getContactById(contactId, userId);

  if (result === null) {
    throw createHttpError(404, 'Contact not found!');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: result,
  });
};

export const createContactController = async (req, res) => {
  const newContact = {
    userId: req.user._id,
    ...req.body,
  };
  const result = await createContact(newContact);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const result = await patchContact(contactId, req.body, userId);

  if (!result) {
    throw createHttpError(404, 'Contact not found!');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const result = await deleteContact(contactId, userId);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found!');
  }

  res.status(204).end();
};
