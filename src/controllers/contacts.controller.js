import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  patchContact,
} from '../services/contacts.service.js';

export const getContactsController = async (req, res) => {
  const result = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Contacts was found!',
    data: result,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);

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
  const result = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await patchContact(contactId, req.body);

  console.log(result);

  if (result === null) {
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
  console.log(contactId);

  const result = await deleteContact(contactId);

  console.log(result);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found!');
  }

  res.status(204).end();
};
