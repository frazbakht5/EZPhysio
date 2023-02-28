import { hash } from 'bcryptjs';
import Patients, { IPatients } from 'src/models/PatientsModel';
import ForgetPassword from 'src/models/ForgetPassword';
import { IForgetPassword } from '../../interfaces/interfaces';

export default class UserService {
  /**
   * Create a Patients
   * @param {Object} UsersBody
   * @returns {Promise<Patients>}
   */
  static createUsers = async (UsersBody: IPatients): Promise<IPatients | null> => {
    return await Patients.create(UsersBody).catch((error: any) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Get all Patients
   * @returns {Promise<Patients>}
   */
  static getUsers = async (_id: string): Promise<IPatients[] | null> => {
    const Userss = await Patients.find({ _id }).catch((error: any) => {
      console.log(error);
      return null;
    });
    return Userss;
  };

  /**
   * Get Patients by id
   * @param {ObjectId} id
   * @returns {Promise<Patients>}
   */
  static getUsersById = async (_id: string): Promise<IPatients | null> => {
    return await Patients.findById({ _id }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Get Patients by email
   * @param {string} email
   * @returns {Promise<Patients>}
   */
  static getUsersByEmail = async (email: string): Promise<IPatients | null> => {
    return await Patients.findOne({ email, is_active: true }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };
  /**
   * Get Patients by email
   * @param {string} email
   * @returns {Promise<Patients>}
   */
  static getAnyUsersByEmail = async (email: string): Promise<IPatients | null> => {
    return await Patients.findOne({ email }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };
  /**
   * Get Patients by email
   * @param {string} email
   * @returns {Promise<Patients>}
   */
  static getUsersByEmailAuthCode = async (email: string, auth_code: string): Promise<IPatients | null> => {
    return await Patients.findOne({ email, auth_code, is_active: true }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Update Patients by id
   * @param {ObjectId} id
   * @param {Object} updateBody
   * @returns {Promise<Patients>}
   */
  static updateUsersById = async (_id: string, updateBody: any): Promise<IPatients | null> => {
    return await Patients.findByIdAndUpdate(
      { _id },
      { $set: updateBody },
      {
        returnOriginal: false,
      },
    ).catch((error) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Delete Patients by id
   * @param {ObjectId} UsersId
   * @returns {Promise<Patients>}
   */
  static deleteUsersById = async (id: string) => {
    const Patients = await this.getUsersById(id).catch((error: any) => {
      console.log(error);
      return null;
    });
    if (!Patients) {
      return { message: 'Patients not found', success: false };
    }
    // await Patients.remove();
    return Patients;
  };

  /**
   * Encrypts password
   * @param password string
   * @returns hashed password string or undefined
   */
  static getHashedPassword = async (password: string): Promise<string | undefined> => {
    return await hash(password, 12).catch((err) => {
      console.log('error in Hashed Password!', err);
      return undefined;
    });
  };

  /**
   * Mapped signup data to Object
   * @param Patients Patients
   * @returns mapped object typeof ISignup
   */
  static getMappedForgetPassword = async (
    user: IPatients,
    verificationCode: string,
  ): Promise<{ email: string; code: string }> => {
    return {
      email: user.email.toLowerCase(),
      code: verificationCode,
    };
  };

  /**
   * Create a ForgetPasswords
   * @param {Object} ForgetPasswords
   * @returns {Promise<ForgetPasswords>}
   */
  static createForgetpassword = async (ForgetPasswords: IForgetPassword): Promise<ForgetPassword | null> => {
    return await ForgetPassword.create(ForgetPasswords).catch((error: any) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Get a ForgetPasswords
   * @param {Object} ForgetPasswords
   * @returns {Promise<ForgetPasswords>}
   */
  static getForgetpassword = async (email: string, code: string): Promise<ForgetPassword | null> => {
    return await ForgetPassword.findOne({ email: email, code: code }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Get a ForgetPasswords
   * @param {Object} ForgetPasswords
   * @returns {Promise<ForgetPasswords>}
   */
  static deleteForgetpassword = async (email: string): Promise<ForgetPassword | null> => {
    return await ForgetPassword.remove({ email: email }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };
}
