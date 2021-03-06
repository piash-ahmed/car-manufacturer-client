import React from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import LoadingSpinner from '../Shared/LoadingSpinner'

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, eUser, loading, error,] = useSignInWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();
    let location = useLocation();
    const token = useToken(eUser || gUser)
    

    let from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    };
    
    
    
    if (loading || gLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (eUser || gUser) {
        navigate(from, { replace: true });
    }

    let signInError;

    if (error || gError) {
        signInError = <p className='text-red-500 mb-2'><small>{error?.message || gError?.message}</small></p>
        console.log(error?.message, gError?.message);
    }


    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-3xl font-semibold uppercase">Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email'
                                    }
                                })}
                            />
                            <label className="label py-0">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-400 pt-2">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-400 pt-2">{errors.email.message}</span>}

                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>

                            <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 character or more'
                                    }
                                })}
                            />
                            <small className='pl-2 pt-1 underline text-blue-300'><Link to='/login'>Forgot Password?</Link></small>

                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-400">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-400">{errors.password.message}</span>}

                            </label>
                        </div>
                        {signInError}

                        <input className='btn btn-secondary w-full mx-w-xs text-white' type="submit" value='Login' />
                        <p className='text-center mt-2'><small>New to Car Manufacturer? <Link className='text-secondary font-semibold' to='/signup'>Create new Account</Link></small></p>
                    </form>
                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()}
                        className="btn btn-outline btn-secondary">Continue with Google</button>
                </div>
            </div>
        </div>


        // <div>
        //     <h1>Please login</h1>
        // </div>
    );
};

export default Login;