import { generatePassword, generateEmailToken,generateResetToken, decode64, checkHash } from 'src/providers/user/domain/index';

import {IUserDocument, IUserModel} from './entity';

const pass_salt_rounds = 10;
const user_salt = 'myappsecret'; //TODO: dont store here

export function updateLastTouch(
  last?: Date | null
):any{
  const now = new Date();
  if(!last || last < now){
    return now;
  }
  return last;
}

export async function updatePassword(
  doc: any, token, new_password):Promise<any>{
  
  let [email_token, hash, timestamp ] =  token.split('.');
  let email = decode64(email_token);
  let crypted_pass = generatePassword(new_password, pass_salt_rounds);
  
  let record = doc.findOneAndUpdate({email: email},{
    $set:{ auth: {password: crypted_pass}
	 }
  });

  return record;
}

export async function updateVerifyToken(
  doc: any, email: string)
: Promise<any>{
  const newToken = await generateEmailToken(email, user_salt);
  return await doc.updateOne({ email: email, },
			     { $set: { auth: {verify_token: newToken },
				       last_updated: new Date(),
				     }
			     });  
}

export async function updateResetToken(
  doc: any,
  email: string
) : Promise<any> { 
  const newToken = await generateResetToken(email, user_salt);
  return await doc.updateOne({email: email},{
    $set: { auth : { reset_token: newToken },
	    last_updated: new Date()
	  }
  });
}

export async function createUser(doc: any, isuer: any): Promise<any>{
  
  const generatedNewPassword = await generatePassword(isuer.password, pass_salt_rounds);
  const generatedEmailToken = await generateEmailToken(isuer.email, user_salt);
  
  let new_auth = {
    auth:{
      password: generatedNewPassword,
      method: 'email',
      roles: ['user'],
      verify_token: generatedEmailToken,
      reset_token: ''
    }
  };
  
  let new_meta = {
    last_updated: new Date(),
    created_at: new Date(),
    status: 'pending',
    validated_email: false,
  };

  let new_user = Object.assign(
    {},
    {
      first_name: isuer.first_name || '',
      last_name: isuer.last_name || '',
      email: isuer.email,
      phone: isuer.phone || ''	
    },
    new_meta,
    new_auth);
  
  let created = new doc(new_user);
  await created.save();
  return created;
}

export async function activateUser(doc: any, email: string, token?: string){
  
  return await doc.updateOne({ email: email, },
			     { $set: { auth: {verify_token:'' },
				       last_updated: new Date(),
				       status: 'active',
				       validated_email: true
				     }
			     });
}


export async function deleteUser(doc: any, id){
  return await doc.findOneAndDelete({_id: id});
}

export async function upsertUser(){};
