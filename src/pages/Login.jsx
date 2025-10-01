import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  // Check if user is already logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('ir_auth_email')
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [navigate])

  // Open in sign-up mode if ?signup=1 present
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('signup') === '1') {
      setIsSignUp(true)
    } else {
      setIsSignUp(false)
    }
  }, [location.search])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    // No async delay or animations; proceed instantly

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    if (isSignUp && !name.trim()) {
      setError('Please enter your name')
      setLoading(false)
      return
    }

    try {
      if (isSignUp) {
        // Store user data for signup
        const userData = {
          email,
          name,
          createdAt: new Date().toISOString()
        }
        localStorage.setItem('ir_user_data', JSON.stringify(userData))
        localStorage.setItem('ir_auth_email', email)
        setError('')
        // notify app that auth changed
        window.dispatchEvent(new Event('ir-auth-changed'))
        navigate('/dashboard')
      } else {
        // For login, check if user exists
        const existingUser = localStorage.getItem('ir_user_data')
        if (existingUser) {
          const userData = JSON.parse(existingUser)
          if (userData.email === email) {
            localStorage.setItem('ir_auth_email', email)
            setError('')
            // notify app that auth changed
            window.dispatchEvent(new Event('ir-auth-changed'))
            navigate('/dashboard')
          } else {
            setError('Invalid email or password')
          }
        } else {
          setError('No account found with this email. Please sign up first.')
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  const handleSocialLogin = (provider) => {
    const mockEmail = `user@${provider}.com`
    localStorage.setItem('ir_auth_email', mockEmail)
    localStorage.setItem('ir_user_data', JSON.stringify({
      email: mockEmail,
      name: `${provider} User`,
      createdAt: new Date().toISOString()
    }))
    // notify app that auth changed
    window.dispatchEvent(new Event('ir-auth-changed'))
    navigate('/dashboard')
  }

  return (
    <div className='relative h-screen w-screen bg-black text-white overflow-hidden'>
      <div className='absolute inset-0 grid lg:grid-cols-2 grid-cols-1'>
        <div className='relative h-full w-full'>
          <video
            className='absolute inset-0 h-full w-full object-cover opacity-70'
            src={'/video.mp4'}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className='absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/60' />
          <div className='relative h-full w-full flex items-center lg:pl-16 pl-6'>
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='h-9 w-9 rounded-md bg-[#0b1426] flex items-center justify-center font-[font2] text-xl'>IR</div>
                <h1 className='font-[font2] text-4xl'>Indian Railways</h1>
              </div>
            </div>
          </div>
        </div>

        <div className='relative h-full w-full flex items-center justify-center p-6'>
          <div className='w-full max-w-[520px] bg-white text-black rounded-xl shadow-2xl border border-black/5'>
            <div className='p-8'>
              <h2 className='font-[font2] text-[40px] leading-tight mb-2'>
                {isSignUp ? 'Create Account' : 'Sign in'}
              </h2>
              <p className='text-sm'>
                {isSignUp ? 'Already have an account? ' : 'New user? '}
                <button 
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setError('')
                    setEmail('')
                    setPassword('')
                    setName('')
                  }}
                  className='text-blue-600 hover:underline cursor-pointer'
                >
                  {isSignUp ? 'Sign in' : 'Create an account'}
                </button>
              </p>

              {error && (
                <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-md'>
                  <p className='text-red-600 text-sm'>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className='mt-6'>
                {isSignUp && (
                  <div className='mb-4'>
                    <label className='text-[13px] text-gray-700'>Full Name</label>
                    <input
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Enter your full name'
                      className='w-full rounded-md border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-3 mt-2'
                      required
                    />
                  </div>
                )}

                <div className='mb-4'>
                  <label className='text-[13px] text-gray-700'>Email address</label>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    className='w-full rounded-md border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-3 mt-2'
                    required
                  />
                </div>

                <div className='mb-6'>
                  <label className='text-[13px] text-gray-700'>Password</label>
                  <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    className='w-full rounded-md border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-3 mt-2'
                    required
                  />
                </div>

                <button
                  type='submit'
                  className='w-full py-3 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 transition-all'
                >
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </button>
              </form>

              <div className='relative my-6'>
                <div className='flex items-center gap-3'>
                  <div className='h-px bg-gray-200 flex-1' />
                  <span className='text-xs text-gray-500'>Or</span>
                  <div className='h-px bg-gray-200 flex-1' />
                </div>
              </div>

              <div className='space-y-3'>
                <button 
                  onClick={() => handleSocialLogin('google')}
                  disabled={loading}
                  className='w-full flex items-center gap-3 border border-gray-300 hover:bg-gray-50 rounded-xl px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                >
                  <span className='h-5 w-5'>
                    <svg viewBox='0 0 24 24' className='h-5 w-5'><path fill='#EA4335' d='M12 11.8v3.6h5.1c-.2 1.3-1.5 3.7-5.1 3.7-3.1 0-5.7-2.6-5.7-5.8s2.6-5.8 5.7-5.8c1.8 0 3 0.8 3.7 1.5l2.5-2.4C16.8 5.3 14.6 4.3 12 4.3 6.9 4.3 2.8 8.4 2.8 13.5S6.9 22.7 12 22.7c6.9 0 9.1-4.8 9.1-7.2 0-.5-.1-.9-.2-1.3H12z'/></svg>
                  </span>
                  <span className='font-[font2]'>Continue with Google</span>
                </button>

                <button 
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={loading}
                  className='w-full flex items-center gap-3 border border-gray-300 hover:bg-gray-50 rounded-xl px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                >
                  <span className='h-5 w-5'>
                    <svg viewBox='0 0 24 24' className='h-5 w-5'><path fill='#1877F2' d='M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 1.88 6.48 1.88 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.91h2.42V9.41c0-2.4 1.43-3.72 3.6-3.72 1.04 0 2.13.19 2.13.19v2.35h-1.2c-1.18 0-1.55.73-1.55 1.48v1.77h2.64l-.42 2.91h-2.22V22c4.78-.8 8.44-4.94 8.44-9.94z'/></svg>
                  </span>
                  <span className='font-[font2]'>Continue with Facebook</span>
                </button>

                <button 
                  onClick={() => handleSocialLogin('apple')}
                  disabled={loading}
                  className='w-full flex items-center gap-3 border border-gray-300 hover:bg-gray-50 rounded-xl px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                >
                  <span className='h-5 w-5'>
                    <svg viewBox='0 0 24 24' className='h-5 w-5' fill='currentColor'><path d='M16.365 1.43c-1.307.076-2.85.912-3.75 1.981-.823.973-1.548 2.432-1.27 3.846 1.49.07 3.018-.848 3.9-1.917.844-1.021 1.507-2.47 1.12-3.91zm4.87 16.27c-.73 1.68-1.61 3.22-2.91 4.96-1.12 1.54-2.53 3.46-4.34 3.48-1.64.02-2.06-1.04-4.29-1.03-2.22.01-2.69 1.06-4.33 1.04-1.81-.02-3.19-1.74-4.31-3.27-3.03-4.2-3.35-9.13-1.48-11.76 1.33-1.89 3.43-2.99 5.41-2.99 2.02 0 3.29 1.06 4.97 1.06 1.64 0 2.59-1.06 4.95-1.06 1.72 0 3.56.94 4.69 2.56-4.12 2.26-3.47 8.18.64 9.01z' /></svg>
                  </span>
                  <span className='font-[font2]'>Continue with Apple</span>
                </button>
              </div>

              <div className='mt-6'>
                <button 
                  onClick={() => setError('Password reset functionality coming soon!')}
                  className='text-sm text-blue-600 hover:underline cursor-pointer'
                >
                  Forgot password?
                </button>
              </div>

              <div className='mt-4'>
                <button 
                  onClick={() => setError('Contact support at help@indianrailways.com')}
                  className='text-sm text-blue-600 hover:underline cursor-pointer'
                >
                  Get help signing in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute bottom-4 left-4 opacity-80 text-xs'>
        <span className='px-1 py-0.5 bg-black/70 rounded'>IR</span>
        <span className='ml-2'>THE INNOVATORS</span>
      </div>
    </div>
  )
}

export default Login