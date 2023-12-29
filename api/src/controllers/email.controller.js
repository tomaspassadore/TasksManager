import { Resend } from 'resend'
import 'dotenv/config'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmailController = async (req, res) => {
  try {
    const { email, name } = req.body
    const { error } = await resend.emails.send({
      from: 'Tasks Manager <tasksmanager@resend.dev>',
      to: email,
      subject: `Welcome ${name}`,
      html: `
        <td align="left" class="esd-block-html">
          <h2>¡Welcome to your tasks manager!</h2>
          <p>Your account has been created successfully</p>
          <p style="text-align:end"><i>Tasks Manager</i></p>
        </td>
      `,
    })
    if (error) res.status(400).json({ message: error })
    return res.status(200).json({ message: '¡Email send!' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error sending email' })
  }
}