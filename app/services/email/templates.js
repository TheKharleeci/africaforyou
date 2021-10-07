export const emailNotification = (subject, message) => `
    <div style="background-color: #F8F9FC">
        <div style="width: 736px; background-color: #fff; margin: 0 auto;">
            <div style="margin: 48px auto 96px; width: 50px; max-width: 50px; max-height: 60px; height: 60px;">
            </div>
            <div style="margin: 0 auto 16px; width: 111px; max-width: 111px; max-height: 103px; height: 103px;">
            </div>
           <div style="text-align: center; padding: 0 45px 32.5px; border-bottom: 1px solid rgba(230, 230, 230, 0.7); 
            font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
                <p style="margin: 0; font-size: 32px; line-height: 44.8px; font-weight: 600;">${subject}</p>
                <p style="margin: 0; color: #939AA3; font-size: 20px; font-weight: 300; line-height: 140%; letter-spacing: -0.02em;">
                    You just received a mail from Africaforyou.
                </p>
            </div>
            <div style="margin: 32px 0 100px; padding: 0 86px; text-align: center; 
            font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
                <p style="margin: 0 0 58px; color: #585858; font-size: 14px; line-height: 140%; font-weight: 300;">
                    <span style="font-weight: 400;">${message}</span><br/><br/>
                    <a style="color: #0041BE; text-decoration: none;" style="font-weight: 400;" href="https://africaforyou.ng/contact-us">please contact us.</a>

                </p>
                <p style="margin: 66px 0 64px; color: #939AA3; font-size: 14px; line-height: 20px; font-weight: 500;">
                    Get in touch if you have any questions regarding our product. <br />
                    Feel free to contact us 24/7 08068958464, 08032038597. We are here to help.
                </p>

                <p style="margin: 0; color: #939AA3; font-size: 14px; line-height: 20px; font-weight: 500;">
                    Best regards, <br /> The Africaforyou Team.
                </p>
            </div>
            <div style="width: 736px; height: 32px; background-color: #0041BE;"></div>
        </div>
    </div>

`;