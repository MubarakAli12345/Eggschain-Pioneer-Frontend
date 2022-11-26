import { Typography, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import "./PrivacyPolicyModal.css";

// import { FcApproval, FcDisapprove, FcCancel } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import firebaseService from "app/services/firebaseService";
// import history from "@history";
import React, { useEffect, useRef, useState } from "react";

import apiService from "../../../helper/apiService";
import { API_BASE_URL } from "app/main/api-config/api";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  marginTop10: {
    marginTop: "10px",
    borderBottom: "1px solid black",
    fontWeight: "bold",
    color: "black",
  },
  boldText: {
    fontWeight: "bold",
  },
  borderBottom: {
    borderBottom: "1px solid black",
    color: "black",
  },
  blackText: {
    color: "#000000",
  },
  borderAndBold: {
    borderBottom: "1px solid black",
    fontWeight: "bold",
    color: "black",
  },
  // acceptIcon: {
  //   fontSize: "18px",
  //   position: "relative",
  //   right: "5px",
  // },
  // acceptButton: {
  //   position: "relative",
  //   right: "16px",
  // },

  // buttonsDiv: {
  //   display: "flex",
  //   justifyContent: "right",
  //   position: "relative",
  //   top: "19px",
  //   left: "21px",
  // },
  // declineButton: {
  //   background: "#7D7D7D",
  // },
  // declineIcon: {
  //   right: "5px",
  //   position: "relative",
  //   fontSize: "19px",
  // },
}));

function PrivacyPolicyModal(props) {
  const classes = useStyles();
  const userData = useSelector(({ auth }) => auth.user.data);
  // function declineHandler() {
  //   history.push({
  //     pathname: "/login",
  //   });
  //   firebaseService.signOut();
  // }
  // async function acceptHandler() {
  //   let payLoad = {
  //     firstLogin: "false",
  //   };
  //   let logs2 = await apiService
  //     .putApi(
  //       `${API_BASE_URL}auth/updateFirstLogin/${userData.firebaseId}`,
  //       payLoad
  //     )
  //     .then((res) => {
  //       console.log("Succesfully Update First Login", res);
  //       props.getSignupUser();
  //     });
  // }
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Typography
          className={classes.boldText}
          style={{ color: "black" }}
          variant="h5"
        >
          Eggschain, INC{" "}
        </Typography>
      </div>
      <Typography variant="h7" className={classes.marginTop10}>
        Acceptance of the Terms of Use
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        {" "}
        These terms of use are entered into by and between You and Eggschain,
        Inc.
        <span className={classes.boldText}> (“Company,” “we,” or “us”) </span>.
        The following terms and conditions, together with any documents
        incorporated by reference (collectively,{" "}
        <span className={classes.boldText}> “Terms of Use” </span>), govern your
        access to and use of the Eggschain website located at www.eggschain.com,
        and including any content, functionality, and services offered on or
        through www.eggschain.com, any Mobile Apps (as defined below), and other
        related software, content, and services, including all versions and
        upgrades thereto (collectively, the “Platform”), whether as a guest or a
        registered user.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        PLEASE READ THE TERMS OF USE CAREFULLY BEFORE YOU START TO USE THE
        PLATFORM.
        <span className={classes.boldText}>
          {" "}
          BY USING THE PLATFORM OR BY CLICKING TO ACCEPT OR AGREE TO THE TERMS
          OF USE WHEN THIS OPTION IS MADE AVAILABLE TO YOU, YOU ACCEPT AND AGREE
          TO BE BOUND AND ABIDE BY THESE TERMS OF USE AND OUR PRIVACY POLICY,
          FOUND AT [PRIVACY POLICY URL], INCORPORATED HEREIN BY REFERENCE.
        </span>
        IF YOU DO NOT WANT TO AGREE TO THESE TERMS OF USE OR THE PRIVACY POLICY,
        YOU MUST NOT ACCESS OR USE THE PLATFORM.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        THE TERMS OF USE REQUIRE FINAL AND BINDING ARBITRATION TO RESOLVE ANY
        DISPUTE OR CLAIM ARISING OUT OF OR RELATING IN ANY WAY TO THE TERMS OF
        USE, OR YOUR ACCESS TO OR USE OF THE PLATFROM, INCLUDING THE VALIDITY,
        APPLICABILITY OR INTERPRETATION OF THE TERMS OF USE, AND YOU AGREE THAT
        ANY SUCH CLAIM WILL BE RESOLVED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A
        CLASS, CONSOLIDATED OR REPRESENTATIVE ACTION, ARBITRATION OR OTHER
        SIMILAR PROCESS. PLEASE REVIEW SECTION TITLED “BINDING ARBITRATION AND
        CLASS ACTION WAIVER” CAREFULLY TO UNDERSTAND YOUR RIGHTS AND OBLIGATIONS
        WITH RESPECT TO THE RESOLUTION OF ANY CLAIM.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        This Platform is offered and available to users who are 18 years of age
        or older, and reside in the United States or any of its territories or
        possessions. By using this Platform, you represent and warrant that you
        are of legal age to form a binding contract with Company and meet all of
        the foregoing eligibility requirements. If you do not meet all of these
        requirements, you must not access or use the Platform.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Changes to the Terms of Use
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        We may revise and update these Terms of Use from time to time in our
        sole discretion. All changes are effective immediately when we post
        them, and apply to all access to and use of the Platform thereafter.
        Your continued use of the Platform following the posting of revised
        Terms of Use means that you accept and agree to the changes. You are
        expected to check this page from time to time so you are aware of any
        changes, as they are binding on you.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Accessing the Platform; Mobile Apps and Account Security{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        Subject to and conditioned on your compliance with the Terms of Use,
        Company hereby grants you a personal, non-exclusive, non-transferable,
        non-sublicensable, revocable license solely to use the Platform only for
        your personal, non-commercial use . Your access to and use of the
        Platform must further comply in all material respects with all usage
        guidelines posted by Company.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        We reserve the right to withdraw or amend this Platform, and any service
        or material we provide on the Platform, in our sole discretion without
        notice. We will not be liable if for any reason all or any part of the
        Platform is unavailable at any time or for any period. From time to
        time, we may restrict access to some parts of the Platform, or the
        entire Platform, to users, including registered users.
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        You are responsible for both:
      </Typography>
      <ul>
        <li className={classes.blackText}>
          Making all arrangements necessary for you to have access to the
          Platform.
        </li>
        <li className={classes.blackText}>
          Ensuring that all persons who access the Platform through your
          internet connection and/or account are aware of these Terms of Use and
          comply with them.
        </li>
      </ul>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        To access the Platform or some of the resources it offers, you may be
        asked to provide certain registration details or other information. It
        is a condition of your use of the Platform that all the information you
        provide on the Platform is correct, current, and complete. You agree
        that all information you provide to register with this Platform or
        otherwise, including, but not limited to, through the use of any
        interactive features on the Platform, is governed by our Privacy Policy,
        and you consent to all actions we take with respect to your information
        consistent with our Privacy Policy.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        If you choose, or are provided with, a user name, password, or any other
        piece of information as part of our security procedures, you must treat
        such information as confidential, and you must not disclose it to any
        other person or entity. You also acknowledge that your account is
        personal to you and agree not to provide any other person with access to
        this Platform or portions of it using your user name, password, or other
        security information. You agree to notify us immediately of any
        unauthorized access to or use of your user name or password or any other
        breach of security. You also agree to ensure that you exit from your
        account at the end of each session. You should use particular caution
        when accessing your account from a public or shared computer so that
        others are not able to view or record your password or other personal
        information.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        We have the right to disable any user name, password, or other
        identifier, whether chosen by you or provided by us, at any time in our
        sole discretion for any or no reason, including if, in our opinion, you
        have violated any provision of these Terms of Use.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        Company may make available mobile software applications for access to
        and use of certain components of the Platform (collectively, “Mobile
        Apps”). Your access to and use of Mobile Apps is subject to and governed
        by these Terms of Use. If any Mobile App is downloaded by you from the
        iTunes App Store (each, an “iOS Mobile App”), your use of such iOS
        Mobile App is further subject to your compliance in all material
        respects with the terms and conditions of the Usage Rules set forth in
        the iTunes App Store Terms of Service. The Terms of Use is between you
        and Company only, and not with Apple Inc. (“Apple”) or any other app
        store provider, and Apple is not responsible for iOS Mobile Apps and the
        contents thereof; however, Apple and Apple’s subsidiaries are
        third-party beneficiaries of these Terms of Use with respect to iOS
        Mobile Apps.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        Intellectual Property Rights
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        The Platform provided to you hereunder or available to you through the
        Platform are licensed, not sold, and Company retains and reserves all
        rights not expressly granted in these Terms of Use. You acknowledge and
        agree that the Platform and its entire contents, features, and
        functionality (including but not limited to all information, software,
        text, displays, images, video, and audio, and the design, selection, and
        arrangement thereof) are owned by Company, its licensors, or other
        providers of such material and are protected by United States and
        international copyright, trademark, patent, trade secret, and other
        intellectual property or proprietary rights laws.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        These Terms of Use permit you to use the Platform for your personal,
        non-commercial use only. You must not reproduce, distribute, modify,
        create derivative works of, publicly display, publicly perform,
        republish, download, store, or transmit any of the material on our
        Platform, except as follows:
      </Typography>
      <br />
      <ul>
        <li className={classes.blackText}>
          Your computer may temporarily store copies of such materials in RAM
          incidental to your accessing and viewing those materials.
        </li>
        <li className={classes.blackText}>
          You may store files that are automatically cached by your Web browser
          for display enhancement purposes.
        </li>
        <li className={classes.blackText}>
          You may print or download one copy of a reasonable number of pages of
          the Platform for your own personal, non-commercial use and not for
          further reproduction, publication, or distribution.
        </li>
        <li className={classes.blackText}>
          If we provide desktop, Mobile Apps, or other applications for
          download, you may download a single copy to your computer or mobile
          device solely for your own personal, non-commercial use, provided you
          agree to be bound by our end user license agreement for such
          applications.
        </li>
        <li className={classes.blackText}>
          If we provide social media features with certain content, you may take
          such actions as are enabled by such features.
        </li>
      </ul>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        You must not:
      </Typography>
      <ul>
        <li className={classes.blackText}>
          Modify copies of any materials from the Platform.
        </li>
        <li className={classes.blackText}>
          Use any illustrations, photographs, video or audio sequences, or any
          graphics separately from the accompanying text.
        </li>
        <li className={classes.blackText}>
          Delete or alter any copyright, trademark, or other proprietary rights
          notices from copies of materials from this site.
        </li>
      </ul>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        You must not access or use for any commercial purposes any part of the
        Platform or any services or materials available through the Platform.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        If you print, copy, modify, download, or otherwise use or provide any
        other person with access to any part of the Platform in breach of the
        Terms of Use, your right to use the Platform will stop immediately and
        you must, at our option, return or destroy any copies of the materials
        you have made. No right, title, or interest in or to the Platform or any
        content on the Platform is transferred to you, and all rights not
        expressly granted are reserved by Company. Any use of the Platform not
        expressly permitted by these Terms of Use is a breach of these Terms of
        Use and may violate copyright, trademark, and other laws.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        You grant Company and its service providers a perpetual, irrevocable,
        worldwide, royalty-free, fully-paid-up, non-exclusive, sublicensable,
        transferable license to use, reproduce, modify, adapt, create derivative
        works from, publicly perform, publicly display, distribute, make and
        have made all content (in any form and any medium, whether now known or
        later developed) that you provide in connection with the Platform. You
        acknowledge and agree that the technical processing and transmission of
        data associated with the Platform, may require: (i) transmissions over
        various networks and across borders; and (ii) modifications to conform,
        connect, and adapt to technical requirements of networks or devices.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Trademarks{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        The name, logo, related terms, product and service names, designs, and
        slogans (collectively, the “Marks”) are trademarks of Company or its
        affiliates or licensors. You must not use such marks without the prior
        written permission of Company. You may not create any derivative works
        of the Marks or use the Marks in a manner that creates or reasonably
        implies an inaccurate sense of endorsement, sponsorship, or association
        with Company. You will not otherwise use business names or logos in a
        manner that can mislead, confuse, or deceive any third party. All use of
        the Marks and all goodwill arising out of such use, will inure to
        Company’s benefit. All other names, logos, product and service names,
        designs, and slogans on this Platform are the trademarks of their
        respective owners.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Prohibited Uses{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        You may use the Platform only for lawful purposes and in accordance with
        these Terms of Use. You agree not to use the Platform:
      </Typography>
      <br />
      <ul>
        <li className={classes.blackText}>
          In any way that violates any applicable federal, state, local, or
          international law or regulation (including, without limitation, any
          laws regarding the export of data or software to and from the US or
          other countries).
        </li>
        <li className={classes.blackText}>
          For the purpose of exploiting, harming, or attempting to exploit or
          harm minors in any way by exposing them to inappropriate content,
          asking for personally identifiable information, or otherwise.
        </li>
        <li className={classes.blackText}>
          To send, knowingly receive, upload, download, use, or re-use any
          material that does not comply with the Content Standards set out in
          these Terms of Use.
        </li>
        <li className={classes.blackText}>
          To transmit, or procure the sending of, any advertising or promotional
          material, including any “junk mail,” “chain letter,” “spam,” or any
          other similar solicitation.
        </li>
        <li className={classes.blackText}>
          To impersonate or attempt to impersonate Company, a Company employee,
          another user, or any other person or entity (including, without
          limitation, by using email addresses or screen names associated with
          any of the foregoing).
        </li>
        <li className={classes.blackText}>
          To engage in any other conduct that restricts or inhibits anyone’s use
          or enjoyment of the Platform, or which, as determined by us, may harm
          Company or users of the Platform, or expose them to liability.
        </li>
      </ul>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        Additionally, you agree not to:
      </Typography>
      <br />
      <ul>
        <li className={classes.blackText}>
          Use the Platform in any manner that could disable, overburden, damage,
          or impair the site or interfere with any other party’s use of the
          Platform, including their ability to engage in real time activities
          through the Platform.
        </li>
        <li className={classes.blackText}>
          Use any robot, spider, or other automatic device, process, or means to
          access the Platform for any purpose, including monitoring or copying
          any of the material on the Platform.
        </li>
        <li className={classes.blackText}>
          Use any manual process to monitor or copy any of the material on the
          Platform, or for any other purpose not expressly authorized in these
          Terms of Use, without our prior written consent.
        </li>
        <li className={classes.blackText}>
          Use any device, software, or routine that interferes with the proper
          working of the Platform.
        </li>
        <li className={classes.blackText}>
          Introduce any viruses, Trojan horses, worms, logic bombs, or other
          material that is malicious or technologically harmful.
        </li>
        <li className={classes.blackText}>
          Attempt to gain unauthorized access to, interfere with, damage, or
          disrupt any parts of the Platform, the server on which the Platform is
          stored, or any server, computer, or database connected to the
          Platform. Company or users of the Platform, or expose them to
          liability.
        </li>
        <li className={classes.blackText}>
          Attack the Platform via a denial-of-service attack or a distributed
          denial-of-service attack.
        </li>
        <li className={classes.blackText}>
          Otherwise attempt to interfere with the proper working of the
          Platform.
        </li>
        <li className={classes.blackText}>
          Use, reproduce, modify, adapt, create derivative works from,
          sublicense, publicly perform, publicly display, distribute, sell,
          lease, rent, make, have made, assign, pledge, transfer or otherwise
          grant rights to the Platform, except as expressly permitted under
          these Terms of Use.
        </li>
        <li className={classes.blackText}>
          Reverse engineer, disassemble, decompile, translate, or otherwise
          attempt to derive trade secrets, algorithms, or the source code,
          architectural framework, or data records, within or associated with
          the Platform.
        </li>
        <li className={classes.blackText}>
          Access the Platform for the purpose of developing, marketing, selling
          or distributing any product or service that competes with or includes
          features substantially similar to the Platform.
        </li>
      </ul>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        User Contributions
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        The Platform may contain, from time to time, message boards, chat rooms,
        personal web pages or profiles, forums, bulletin boards, tools, and
        other interactive features (collectively, “Interactive Services”) that
        allow users create, post, submit, publish, display, store, transmit, or
        otherwise create content or materials that are intended to be shared
        with other users, or are otherwise of a non-confidential nature
        (collectively, “User Contributions”) on or through the Platform. All
        User Contributions must comply with the Content Standards set out in
        these Terms of Use. Any User Contribution you create through the
        Platform will be considered non-confidential and non-proprietary. By
        creating any User Contribution on the Platform, you grant us and our
        affiliates and service providers, and each of their and our respective
        licensees, successors, and assigns a perpetual, irrevocable, worldwide,
        royalty-free, fully-paid-up, non-exclusive, sublicensable, transferable
        license to use, reproduce, modify, adapt, create derivative works from,
        publicly perform, publicly display, distribute, make, have made and
        otherwise disclose to third parties any such material for any
        purpose/according to your account settings.
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        You represent and warrant that:
      </Typography>
      <br />
      <ul>
        <li className={classes.blackText}>
          You own or control all rights in and to the User Contributions and
          have the right to grant the license granted above to us and our
          affiliates and service providers, and each of their and our respective
          licensees, successors, and assigns.
        </li>
        <li className={classes.blackText}>
          All of your User Contributions do and will comply with these Terms of
          Use.
        </li>
      </ul>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        You understand and acknowledge that you are responsible for any User
        Contributions you create, and you, not Company, have full responsibility
        for such content, including its legality, reliability, accuracy, and
        appropriateness.
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        We are not responsible or liable to any third party for the content or
        accuracy of any User Contributions created by you or any other user of
        the Platform.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Monitoring and Enforcement; Termination
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        We have the right to:
      </Typography>
      <br />
      <ul>
        <li className={classes.blackText}>
          Remove or refuse to post any User Contributions for any or no reason
          in our sole discretion.
        </li>
        <li className={classes.blackText}>
          Take any action with respect to any User Contribution that we deem
          necessary or appropriate in our sole discretion, including if we
          believe that such User Contribution violates the Terms of Use,
          including the Content Standards, infringes any intellectual property
          right or other right of any person or entity, threatens the personal
          safety of users of the Platform or the public, or could create
          liability for Company.
        </li>
        <li className={classes.blackText}>
          Disclose your identity or other information about you to any third
          party who claims that material posted by you violates their rights,
          including their intellectual property rights or their right to
          privacy.
        </li>
        <li className={classes.blackText}>
          Take appropriate legal action, including without limitation, referral
          to law enforcement, for any illegal or unauthorized use of the
          Platform.
        </li>
        <li className={classes.blackText}>
          Terminate or suspend your access to all or part of the Platform for
          any or no reason, including without limitation, any violation of these
          Terms of Use. Without limiting the foregoing, we have the right to
          cooperate fully with any law enforcement authorities or court order
          requesting or directing us to disclose the identity or other
          information of anyone posting any materials on or through the
          Platform. YOU WAIVE AND HOLD HARMLESS COMPANY AND ITS AFFILIATES,
          LICENSEES, AND SERVICE PROVIDERS FROM ANY CLAIMS RESULTING FROM ANY
          ACTION TAKEN BY ANY OF THE FOREGOING PARTIES DURING, OR TAKEN AS A
          CONSEQUENCE OF, INVESTIGATIONS BY EITHER SUCH PARTIES OR LAW
          ENFORCEMENT AUTHORITIES. However, we cannot review material before it
          is posted on the Platform, and cannot ensure prompt removal of
          objectionable material after it has been posted. Accordingly, we
          assume no liability for any action or inaction regarding
          transmissions, communications, or content provided by any user or
          third party. We have no liability or responsibility to anyone for
          performance or nonperformance of the activities described in this
          section.
        </li>
      </ul>
      <br />

      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Content Standards
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        These content standards apply to any and all User Contributions and use
        of Interactive Services. User Contributions must in their entirety
        comply with all applicable federal, state, local, and international laws
        and regulations. Without limiting the foregoing, User Contributions must
        not: Contain any material that is defamatory, obscene, indecent,
        abusive, offensive, harassing, violent, hateful, inflammatory, or
        otherwise objectionable. Promote sexually explicit or pornographic
        material, violence, or discrimination based on race, sex, religion,
        nationality, disability, sexual orientation, or age. Infringe any
        patent, trademark, trade secret, copyright, or other intellectual
        property or other rights of any other person. Violate the legal rights
        (including the rights of publicity and privacy) of others or contain any
        material that could give rise to any civil or criminal liability under
        applicable laws or regulations or that otherwise may be in conflict with
        these Terms of Use and our Privacy Policy. Be likely to deceive any
        person. Promote any illegal activity, or advocate, promote, or assist
        any unlawful act. Cause annoyance, inconvenience, or needless anxiety or
        be likely to upset, embarrass, alarm, or annoy any other person.
        Impersonate any person, or misrepresent your identity or affiliation
        with any person or organization. Involve commercial activities or sales,
        such as contests, sweepstakes, and other sales promotions, barter, or
        advertising. Give the impression that they emanate from or are endorsed
        by us or any other person or entity, if this is not the case.
      </Typography>

      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Reliance on Information Posted
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        The information presented on or through the Platform is made available
        solely for general information purposes. We do not warrant the accuracy,
        completeness, or usefulness of this information. Any reliance you place
        on such information is strictly at your own risk. We disclaim all
        liability and responsibility arising from any reliance placed on such
        materials by you or any other visitor to the Platform, or by anyone who
        may be informed of any of its contents. This Platform may include
        content provided by third parties, including materials provided by other
        users, bloggers, and third-party licensors, syndicators, aggregators,
        and/or reporting services (collectively, “Third Party Services”). All
        statements and/or opinions expressed in these materials, and all
        articles and responses to questions and other content, other than the
        content provided by Company, are solely the opinions and the
        responsibility of the person or entity providing those materials. These
        materials do not necessarily reflect the opinion of Company. We are not
        responsible, or liable to you or any third party, for the content or
        accuracy of any materials provided by any third parties. You acknowledge
        that different terms of use and privacy policies may apply to your use
        of such Third Party Services and that terms and policies are solely
        between you and the advertiser or other third party. You agree that does
        not endorse and is not responsible or liable for any issues related to
        Third Party Services.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Changes to the Platform
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        We may update the content on this Platform from time to time, but its
        content is not necessarily complete or up-to-date. Any of the material
        on the Platform may be out of date at any given time, and we are under
        no obligation to update such material.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Information About You and Your Visits to the Platform
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        All information we collect on this Platform is subject to our Privacy
        Policy. By using the Platform, you consent to all actions taken by us
        with respect to your information in compliance with the Privacy Policy.
      </Typography>

      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        General Terms and Conditions Related to NFT Transactions
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        While using the Platform, you may have the opportunity to earn,
        purchase, acquire, or otherwise receive non-fungible tokens (“NFT”)
        minted on certain blockchain networks. NFTs may be acquired during
        purchase opportunities or other events such as auctions or contests,
        which Company may make available to you from time to time. Acquisition
        of NFTs may be subject to additional terms and conditions that are
        specific to the particular sale, auction, contest, or other event
        through which they are acquired, including terms of use and privacy
        policies of third parties, which terms and policies are solely between
        you and the third party (“NFT Terms”).
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        NFTs may include or be associated with (i) usage rights for multimedia
        content in the form of images, audio, video, text, or other forms (“NFT
        Content”) and (ii) other benefits, such as exclusive access to Eggschain
        software or features, discounts for Eggschain and/or third party goods
        and/or services (“NFT Benefit”). Particular NFT Content and NFT Benefits
        are as described in the applicable NFT Terms.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        Any payment made to Company for NFTs is final and non-refundable, and
        you will be solely responsible to pay any and all sales, use,
        value-added and other taxes, duties, and assessments (except taxes on
        our net income) now or hereafter claimed or imposed by any governmental
        authority associated with your use of the Platform.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        Subject to your continued compliance with these Terms of Use and any
        applicable NFT Terms, Company grants you a worldwide, non-exclusive,
        non-transferable, royalty-free license to use, copy, and display the NFT
        associated with your NFT, solely for your own personal, non-commercial
        use. You agree that your rights to NFT Content do not place an
        obligation on Company or any other party to provide you data, files, or
        other materials that embody the NFT Content. You agree that you may not,
        nor permit any third party to do or attempt to do any of the foregoing
        without Company’s express prior written consent in each case: (a) modify
        the NFT Content in any way; (b) use the NFT Content to advertise,
        market, or sell any product or service; (c) use the NFT Content in any
        way in connection with text, images, videos, or other forms of media
        that depict hatred, intolerance, violence, cruelty, or anything else
        that could reasonably be found to constitute hate speech or
        objectionable material, or otherwise infringe upon the rights of others;
        (d) use the NFT Content in images, movies, videos, or any other forms of
        media, except to the limited extent that such use is solely for your own
        personal, non-commercial use; (e) sell, offer to sell, distribute, or
        otherwise commercialize merchandise that includes, contains, or consists
        of the NFT Content; (f) attempt to trademark, copyright, or otherwise
        acquire additional intellectual property rights in or to the NFT
        Content; or (g) otherwise utilize the NFT Content for your or any third
        party’s commercial benefit.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        Your rights associated with any NFT Content or NFT Benefit are subject
        to your compliance with these Terms of Use and any NFT Terms associated
        with your acquisition of the corresponding NFT. While you may transfer
        your NFT to another person, any underlying rights to NFT Content or NFT
        Benefits associated with your NFT are only transferable with that NFT to
        the extent that the recipient also accepts these Terms of Use and any
        NFT Terms, and any licenses granted by these Terms of Use or any NFT
        Terms will immediately expire upon such a transfer. Further, Company
        may, at Company’s sole and absolute discretion and for any reason,
        revoke or modify any NFT Benefit with or without notice to you or any
        third party.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        YOU WAIVE AND HOLD COMPANY AND ANY COMPANY AFFILIATES AND OUR AND THEIR
        RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, SERVICE PROVIDERS,
        CONTRACTORS, LICENSORS, LICENSEES, SUPPLIERS, AND SUCCESSORS HARMLESS
        FROM ANY AND ALL CLAIMS RESULTING FROM YOUR PURCHASE OF NFT, OR ANY NFT
        CONTENT OR NFT BENEFITS ASSOCIATED THEREWITH. YOU ACCEPT THE INHERENT
        SECURITY RISKS OF PROVIDING INFORMATION AND DEALING ONLINE OVER THE
        INTERNET, AND AGREE THAT WE HAVE NO LIABILITY OR RESPONSIBILITY FOR ANY
        BREACH OF SECURITY.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        WE WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSSES YOU INCUR AS
        THE RESULT OF YOUR PURCHASE OF NFT, OR USE OF ANY ELECTRONIC WALLET,
        INCLUDING BUT NOT LIMITED TO ANY LOSSES, DAMAGES OR CLAIMS ARISING FROM:
        (I) USER ERROR, SUCH AS FORGOTTEN PASSWORDS OR INCORRECTLY CONSTRUED
        SMART CONTRACTS OR OTHER TRANSACTIONS; (II) SERVER FAILURE OR DATA LOSS;
        (III) CORRUPTED WALLET FILES; OR (IV) UNAUTHORIZED ACCESS OR ACTIVITIES
        BY THIRD PARTIES, INCLUDING, BUT NOT LIMITED TO, THE USE OF VIRUSES,
        PHISHING, BRUTE-FORCING OR OTHER MEANS OF ATTACK AGAINST THE PLATFORM,
        ANY NFT BLOCKCHAIN OR NETWORK, OR ANY ELECTRONIC WALLET.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        NFTS ARE INTANGIBLE DIGITAL ASSETS THAT EXIST ONLY BY VIRTUE OF THE
        OWNERSHIP RECORD MAINTAINED IN UNDERLYING BLOCKCHAIN OR NETWORK. ALL
        SMART CONTRACTS ARE CONDUCTED AND OCCUR ON DECENTRALIZED LEDGERS WITHIN
        THOSE NETWORKS. WE HAVE NO CONTROL OVER AND MAKE NO GUARANTEES OR
        PROMISES WITH RESPECT TO SMART CONTRACTS OR ANY OTHER ASPECT OF ANY NFT
        NETWORK.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        WE ARE NOT RESPONSIBLE FOR LOSSES DUE TO BLOCKCHAINS OR ANY OTHER
        FEATURES OF THE NFT NETWORK, OR ANY ELECTRONIC WALLET, INCLUDING BUT NOT
        LIMITED TO LATE REPORT BY DEVELOPERS OR REPRESENTATIVES (OR NO REPORT AT
        ALL) OF ANY ISSUES WITH THE BLOCKCHAIN SUPPORTING THE NFT NETWORK,
        INCLUDING FORKS, TECHNICAL NODE ISSUES, OR ANY OTHER ISSUES HAVING FUND
        LOSSES AS A RESULT.{" "}
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Linking to the Platform and Social Media Features{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        You may link to portions of the Platform where such functionality is
        provided, provided you do so in a way that is fair and legal and does
        not damage our reputation or take advantage of it, but you must not
        establish a link in such a way as to suggest any form of association,
        approval, or endorsement on our part.
        <br /> This Platform may provide certain social media features that
        enable you to:
      </Typography>
      <br />
      <ul>
        <li className={classes.blackText}>
          Link from your own or certain third-party websites to certain content
          on this Platform.
        </li>
        <li className={classes.blackText}>
          Send emails or other communications with certain content, or links to
          certain content, on this Platform.
        </li>
        <li className={classes.blackText}>
          Cause limited portions of content on this Platform to be displayed or
          appear to be displayed on your own or certain third-party websites.
        </li>
        <span className={classes.blackText}>
          {" "}
          You may use these features solely as they are provided by us, and
          solely with respect to the content they are displayed with. Subject to
          the foregoing, you must not:
        </span>
        <li className={classes.blackText}>
          Establish a link from any website that is not owned by you.
        </li>
        <li className={classes.blackText}>
          Cause the Platform or portions of it to be displayed on, or appear to
          be displayed by, any other site, for example, framing, deep linking,
          or in-line linking.
        </li>
        <li className={classes.blackText}>
          Link to any part of the Platform other than the homepage.{" "}
        </li>
        <li className={classes.blackText}>
          Otherwise take any action with respect to the materials on this
          Platform that is inconsistent with any other provision of these Terms
          of Use.
          <br />
          The website from which you are linking, or on which you make certain
          content accessible, must comply in all respects with the Content
          Standards set out in these Terms of Use. You agree to cooperate with
          us in causing any unauthorized framing or linking immediately to stop.
          We reserve the right to withdraw linking permission without notice. We
          may disable all or any social media features and any links at any time
          without notice in our discretion.
        </li>
      </ul>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Links from the Platform
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        If the Platform contains links to other sites and resources provided by
        third parties, these links are provided for your convenience only. This
        includes links contained in advertisements, including banner
        advertisements and sponsored links. We have no control over the contents
        of those sites or resources, and accept no responsibility for them or
        for any loss or damage that may arise from your use of them. If you
        decide to access any of the third-party websites linked to this
        Platform, you do so entirely at your own risk and subject to the terms
        and conditions of use and privacy policy for such websites.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Geographic Restrictions
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        We provide this Platform for use only by persons located in the United
        States. We make no claims that the Platform or any of its content is
        accessible or appropriate outside of the United States. Access to the
        Platform may not be legal by certain persons or in certain countries. If
        you access the Platform from outside the United States, you do so on
        your own initiative and are responsible for compliance with local laws.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Disclaimer of Warranties{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        You understand that we cannot and do not guarantee or warrant that files
        available for downloading from the internet or the Platform will be free
        of viruses or other destructive code. You are responsible for
        implementing sufficient procedures and checkpoints to satisfy your
        particular requirements for anti-virus protection and accuracy of data
        input and output, and for maintaining a means external to our site for
        any reconstruction of any lost data. TO THE FULLEST EXTENT PROVIDED BY
        LAW, WE WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED BY A
        DISTRIBUTED DENIAL-OF-SERVICE ATTACK, VIRUSES, OR OTHER TECHNOLOGICALLY
        HARMFUL MATERIAL THAT MAY INFECT YOUR COMPUTER EQUIPMENT, COMPUTER
        PROGRAMS, DATA, OR OTHER PROPRIETARY MATERIAL DUE TO YOUR USE OF THE
        PLATFORM OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE PLATFORM OR TO
        YOUR DOWNLOADING OF ANY MATERIAL POSTED ON IT, OR ON ANY WEBSITE LINKED
        TO IT.
        <br />
        <br />
        TO THE FULLEST EXTENT PROVIDED BY LAW, COMPANY HEREBY DISCLAIMS ALL
        WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR
        OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
        MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.
        <br />
        <br />
        THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE EXCLUDED OR
        LIMITED UNDER APPLICABLE LAW.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        YOUR USE OF THE PLATFORM, ITS CONTENT, AND ANY SERVICES OR ITEMS
        OBTAINED THROUGH THE PLATFORM IS AT YOUR OWN RISK. THE PLATFORM, ITS
        CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE PLATFORM ARE
        PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT ANY WARRANTIES
        OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER COMPANY NOR ANY PERSON
        ASSOCIATED WITH COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH
        RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY,
        OR AVAILABILITY OF THE PLATFORM. WITHOUT LIMITING THE FOREGOING, NEITHER
        COMPANY NOR ANYONE ASSOCIATED WITH COMPANY REPRESENTS OR WARRANTS THAT
        THE PLATFORM, ITS CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE
        PLATFORM WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT
        DEFECTS WILL BE CORRECTED, THAT OUR SITE OR THE SERVER THAT MAKES IT
        AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT THE
        PLATFORM OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE PLATFORM WILL
        OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Limitation on Liability
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL COMPANY, ITS
        AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS,
        OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY
        LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR
        INABILITY TO USE, THE PLATFORM, ANY WEBSITES LINKED TO IT, ANY CONTENT
        ON THE PLATFORM OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT,
        SPECIAL, INCIDENTAL, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE DAMAGES,
        INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING,
        EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS
        OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND
        WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR
        OTHERWISE, EVEN IF FORESEEABLE. IN NO EVENT WILL THE COLLECTIVE
        LIABILITY OF COMPANY AND ITS SUBSIDIARIES AND AFFILIATES, AND THEIR
        LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, AND
        DIRECTORS, TO ANY PARTY (REGARDLESS OF THE FORM OF ACTION, WHETHER IN
        CONTRACT, TORT, OR OTHERWISE) EXCEED THE AMOUNT YOU HAVE PAID TO
        COMPANY, FOR THE APPLICABLE PRODUCT OR SERVICE OUT OF WHICH LIABILITY
        AROSE, IN THE LAST 3 MONTHS.
        <br />
        <br />
        THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE EXCLUDED OR
        LIMITED UNDER APPLICABLE LAW.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Indemnification
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        You agree to defend, indemnify, and hold harmless Company, its
        affiliates, licensors, and service providers, and its and their
        respective officers, directors, employees, contractors, agents,
        licensors, suppliers, successors, and assigns from and against any
        claims, liabilities, damages, judgments, awards, losses, costs,
        expenses, or fees (including reasonable attorneys’ fees) arising out of
        or relating to your violation of these Terms of Use, any NFT Terms, or
        your use of the Platform, including, but not limited to, your User
        Contributions, any use of the Platform’s content, services, and products
        other than as expressly authorized in these Terms of Use, or your use of
        any information obtained from the Platform.
      </Typography>

      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Governing Law
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        All matters relating to the Platform and these Terms of Use, and any
        dispute or claim arising therefrom or related thereto (in each case,
        including non-contractual disputes or claims), shall be governed by and
        construed in accordance with the internal laws of the State of Texas
        (Travis county) without giving effect to any choice or conflict of law
        provision or rule (whether of the State of Texas or any other
        jurisdiction).
      </Typography>

      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Binding Arbitration and Class Action Waiver
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        ALL CLAIMS ARISING IN CONNECTION WITH THESE TERMS OF USE SHALL BE
        RESOLVED BY FINAL AND BINDING ARBITRATION RATHER THAN IN COURT, EXCEPT
        THAT YOU MAY ASSERT CLAIMS IN SMALL CLAIMS COURT (DEFINED FOR THE
        PURPOSES OF THESE TERMS OF USE AS A COURT OF LIMITED JURISDICTION THAT
        MAY ONLY HEAR CLAIMS NOT EXCEEDING $5,000) IF YOUR CLAIMS ARE WITHIN THE
        COURT’S JURISDICTION. THERE IS NO JUDGE OR JURY IN ARBITRATION, AND
        COURT REVIEW OF AN ARBITRATION AWARD IS LIMITED.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        The arbitration shall be conducted by the American Arbitration
        Association (AAA) under its then-applicable Commercial Arbitration Rules
        or, as appropriate, its Consumer Arbitration Rules. The AAA’s rules are
        available at http://www.adr.org/. Payment of all filing, administration
        and arbitrator fees shall be governed by the AAA’s rules. The
        arbitration shall be conducted in the English language by a single
        independent and neutral arbitrator. For any hearing conducted in person
        as part of the arbitration, you agree that such hearing shall be
        conducted in Austin, Texas or, if the Consumer Arbitration Rules apply,
        another location reasonably convenient to both parties with due
        consideration of their ability to travel and other pertinent
        circumstances, as determined by the arbitrator. The decision of the
        arbitrator shall be final and binding. Judgment on the arbitral award
        may be entered in any court of competent jurisdiction.
        <br />
        <br />
        WE EACH AGREE THAT ALL CLAIMS SHALL BE RESOLVED ONLY ON AN INDIVIDUAL
        BASIS AND NOT IN A CLASS, CONSOLIDATED OR REPRESENTATIVE ACTION OR OTHER
        SIMILAR PROCESS (INCLUDING ARBITRATION). IF FOR ANY REASON A CLAIM
        PROCEEDS IN COURT RATHER THAN IN ARBITRATION, WE EACH WAIVE ANY RIGHT TO
        A JURY TRIAL AND AGREE THAT SUCH CLAIM SHALL BE BROUGHT ONLY IN A COURT
        OF COMPETENT JURISDICTION IN AUSTIN, TEXAS. YOU HEREBY SUBMIT TO THE
        PERSONAL JURISDICTION AND VENUE OF SUCH COURTS AND WAIVE ANY OBJECTION
        ON THE GROUNDS OF VENUE, FORUM NON-CONVENIENS OR ANY SIMILAR GROUNDS
        WITH RESPECT TO ANY SUCH CLAIM.
        <br />
        <br />
        Notwithstanding anything to the contrary, you and Company may seek
        injunctive relief and any other equitable remedies from any court of
        competent jurisdiction to protect its intellectual property rights,
        whether in aid of, pending, or independently of the resolution of any
        dispute pursuant to the arbitration procedures set forth in this Section
        titled Binding Arbitration and Class Action Waiver.
        <br />
        <br />
        If Company implements any material change to this Section titled Binding
        Arbitration and Class Action Waiver, such change shall not apply to any
        Claim for which you provided written notice to Company before the
        implementation of the change.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Force Majeure{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        Company will not be liable or responsible to you, nor be deemed to have
        defaulted under or breached these Terms of Use, for any failure or delay
        in fulfilling or performing any of these Terms of Use, when and to the
        extent such failure or delay is caused by or results from the following
        force majeure events (“Force Majeure Event(s)”): (a) acts of God; (b)
        flood, fire, earthquake, epidemics, pandemics, tsunami, explosion; (c)
        war, invasion, hostilities (whether war is declared or not), terrorist
        threats or acts, riot or other civil unrest; (d) government order, law,
        or action; (e) embargoes or blockades in effect on or after the date of
        this agreement; (f) strikes, labour stoppages or slowdowns or other
        industrial disturbances; (g) shortage of adequate or suitable Internet
        connectivity, telecommunication breakdown or shortage of adequate power
        or electricity; and (h) other similar events beyond our control. If we
        suffer a Force Majeure Event, we will use reasonable efforts to promptly
        notify you of the Force Majeure Event, stating the period of time the
        occurrence is expected to continue. We will use diligent efforts to end
        the failure or delay and ensure the effects of such Force Majeure Event
        are minimized.Limitation on Time to File Claims.
        <br />
        <br />
        ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING TO
        THESE TERMS OF USE OR THE PLATFORM MUST BE COMMENCED WITHIN ONE (1) YEAR
        AFTER THE CAUSE OF ACTION ACCRUES; OTHERWISE, SUCH CAUSE OF ACTION OR
        CLAIM IS PERMANENTLY BARRED.
      </Typography>
      <br />

      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Waiver and Severability{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        No waiver by Company of any term or condition set out in these Terms of
        Use shall be deemed a further or continuing waiver of such term or
        condition or a waiver of any other term or condition, and any failure of
        Company to assert a right or provision under these Terms of Use shall
        not constitute a waiver of such right or provision.
        <br />
        <br />
        If any provision of these Terms of Use is held by a court or other
        tribunal of competent jurisdiction to be invalid, illegal, or
        unenforceable for any reason, such provision shall be eliminated or
        limited to the minimum extent such that the remaining provisions of the
        Terms of Use will continue in full force and effect.
      </Typography>

      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Entire Agreement
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        The Terms of Use, our Privacy Policy, and any applicable NFT Terms
        constitute the sole and entire agreement between you and Company
        regarding the Platform and supersede all prior and contemporaneous
        understandings, agreements, representations, and warranties, both
        written and oral, regarding the Platform. <br />
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Your Comments and Concerns
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        The Platform, including any software applications, websites, or other
        services, is operated by Eggschain, Inc. and all feedback, comments,
        requests for technical support, and other communications relating to the
        Platform should be directed to: feedback@eggschain.com
      </Typography>
      <br />

      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        NFT Terms for “First Sperm on Blockchain NFT Auction”{" "}
      </Typography>
      <br />
      <br />
      <ul>
        <li className={classes.blackText}>
          {" "}
          Eggschain, Inc. (“Eggschain”) has made NFTs available through the
          “First Sperm on Blockchain NFT Auction” (the “Event”), a description
          of which is available at:
        </li>
        <li className={classes.blackText}>
          Your purchase or receipt of any NFT through the Event is subject to
          the terms and conditions herein, as well as our Terms of Use, which
          are located at: (collectively, the “Terms”). Any capitalized term used
          herein and not defined will be given the meaning ascribed to it in the
          Terms of Use.
        </li>
        <li className={classes.blackText}>
          By purchasing or receiving any NFT through the Event, you hereby
          accept these Terms and acknowledge that they are a binding contract
          between you and Eggschain.
        </li>
        <li className={classes.blackText}>
          The Event is an auction style sale of an NFT associated with unique
          NFT Content and NFT Benefits. The highest bid submitted during the
          auction will receive the NFT, as well as the applicable license for
          NFT Content, and the right to exercise the NFT Benefits.
        </li>
        <li className={classes.blackText}>
          The NFT Benefits include the right to use the Platform and associated
          third party services, which are each subject to their own terms and
          conditions, including without limitation, the terms and conditions of
          Layer Technology located at:
          https://docs.google.com/document/d/e/2PACX-1vQpEv-EHVkYUPeqWoAfTBNfSOa7ARJeE24xXrws1Fz16YrOIUXCqDnK8t0gMFAztbGz0r5mQhc0fAC3/pub,
          that must be accepted upon exercising the NFT Benefit, to claim and
          use the first publicly available spot for sperm to be stored with
          Eggschain’s blockchain technology. The NFT Benefit may only be
          exercised in conjunction with storage of sperm by an
          Eggschain-approved clinic, and must be exercised within 30 days of the
          auction end date.
        </li>
        <li className={classes.blackText}>
          A description of Eggschain’s technology for storing sperm with the
          blockchain is available at:
        </li>
        <li className={classes.blackText}>
          If you are the highest bid at the time that the Event ends, you
          authorize Eggschain to charge or debit funds using any payment method
          or other information that you have provided. All payments made in
          relation to the Event are non-refundable. Upon completion of your
          payment, Eggschain will effect the transfer of the NFT to you using
          the electronic wallet or other digital asset information that you
          provided.
        </li>
        <li className={classes.blackText}>
          he patient/consumer/highest bidder will be responsible for the cost of
          the doctor’s visit, any associated testing related to the sperm
          collection and the sperm storage fee.
          <br />
          Participating clinics may offer 10% discount on sperm storage only.
        </li>
      </ul>
      <hr className={classes.blackText} />

      <div style={{ textAlign: "center" }}>
        <Typography className={classes.blackText} variant="h6">
          PRIVACY POLICY{" "}
        </Typography>
      </div>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        Your privacy is important to Eggschain Online, Inc. (“Eggschain”). This
        Eggschain Privacy Policy (“Privacy Policy”) describes how Eggschain may
        collect, use, store, disclose, and process your personal information,
        through your access to or use of Eggschain products and services,
        including those at https://eggschain.com/, www.prealignment.com and
        related websites, mobile software applications, and other offerings
        (collectively, the “Solutions”). By using these Solutions, you signify
        your acceptance of this Privacy Policy. If you do not agree to this
        Privacy Policy, please do not use the Solutions. Eggschain may change
        this Privacy Policy from time to time by posting changes at this URL,
        with or without additional notification to you. Your continued use of
        the Solutions following the posting of such changes will be deemed your
        acceptance of those changes.
        <br />
        <br />
        Eggschain encourages you to read this Privacy Policy in its entirety,
        but here are a few key points of our privacy practices:
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Privacy Policy Applicability{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        This Privacy Policy applies when you access the Solutions or share
        information with Eggschain and may be revised at any time. More
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Information We Collect from You{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        We collect all information that you provide including information you
        provide via the Solutions, your devices (e.g., computers, smartphones,
        and tablets), telephone and email, as well as information we receive
        from partners and through the use of cookies and other such
        technologies. Eggschain may also use cookies and similar technologies to
        collect information about your activities on the Solutions. More
      </Typography>

      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        How We Use Your Information{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        We process your personal information only with your consent or as needed
        to provide you Solutions. We may also use your personal information to
        comply with legal obligations, operate our business (including
        advertising), protect the vital interests of you, our customers, or the
        public, or for other legitimate interests of Eggschain as further
        described below. More
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        How We Share Your Information{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        We share your information with our partners, service providers,
        contractors, agents and third-party vendors as they need it to fulfill
        Solutions or other requests you make of Eggschain. We may also share
        your information to comply with law or for other legitimate interests.
        More
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        How We Store and Secure Your Information{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        Eggschain may store your information in any country where Eggschain or
        its affiliates, partners, or providers operate facilities, and will
        retain your information as long as necessary for the purposes outlined
        in this Privacy Policy. Eggschain takes technological and organizational
        measures to protect your personal information against loss, theft, and
        unauthorized access, use, disclosure or modification. More
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Accessing and Updating Your Information{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        You can access, get copies of, delete, change or correct your personal
        information, or request changes to our use of your personal information
        by using the contact information below. <br />
        More
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Additional Privacy Information{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        Eggschain’s databases are located in the United States and you consent
        to the transfer or your personal information from your location to the
        United States. The Solutions is not for use by children under the age of
        13 years old. You may have additional rights under applicable law. If
        you have any questions about this privacy policy, please contact us via
        the information below.
        <br /> More
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Privacy Policy Applicability{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        This Privacy Policy applies when you access the Solutions or share
        information with Eggschain, as indicated below. By using the Solutions,
        you consent to this Privacy Policy, which may be updated by us at any
        time. If you do not consent to this Privacy Policy for any reason,
        please do not use the Solutions or share your information with us.
        Please note that this Privacy Policy applies only to the Solutions, and
        not to any other third-party website linked to or from it, or any
        third-party website in which Eggschain content or functionality is
        embedded. We do not control the privacy policies or practices of others.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Information We Collect from You{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        In general, we receive and collect all information you provide via the
        Solutions, including through website input fields (including
        advertisements), phone, email (including email campaigns), web chat, or
        in other such ways. This includes personal information that can identify
        or relates to you, including but not limited to your first and last
        name, telephone number, IP, postal, and email addresses. You have the
        choice on what information to share and the services you want to engage.
        You can choose not to provide information to us, but in general some
        information about you is required in order for you access certain
        functionality of the Solutions, such as those mentioned above or for
        tracking your preferences, subscribing to a newsletter, or initiating
        other such actions. We also may periodically obtain both personal and
        non-personal information about you from affiliated entities, partners
        and other independent third-party sources and will add it to our
        database of information. For example, we may receive information about
        your interaction with advertisements on third party websites, including
        updated postal addresses and demographic information. We may use
        cookies, log files, web beacons, device identifiers, advertising
        identifiers and similar tracking technologies, including those from
        third-party service providers like Google Analytics, Google Tag Manager,
        HubSpot, and other cloud-based tools, to automatically collect your
        preferences, performance data and information about your web usage when
        you visit the Solutions. For example, we may collect your IP address,
        device and Internet service provider information, Web browser details
        and the address of any referring website. This may include collecting
        geolocation signals from your IP address or device settings to determine
        your location so that we may operate and personalize the Solutions for
        you, including to provide more relevant ads and search results. We may
        also collect information about your online activity, such as pages
        viewed and interactions with other users. You can learn more about
        targeted ads and your ability to opt out of receiving interest-based ads
        at optout.aboutads.info and www.networkadvertising.org/choices. The
        Solutions are not designed to recognize or respond to “do not track”
        signals received from browsers. You can control the information
        collected by such tracking technologies or be alerted when cookies are
        sent by adjusting the settings on your Internet browser or devices, but
        such adjustments may affect or disable certain functionality of the
        Solutions. When you access or use the Solutions using a mobile device,
        Eggschain may access, collect, monitor and/or remotely store one or more
        “device identifiers,” such as a universally unique identifier (UUID).
        Device identifiers are small data files or similar data structures
        stored on or associated with your device that uniquely identify your
        device. A device identifier may consist of data stored in connection
        with the device hardware, operating system or other software, or data
        sent to the device by Eggschain. A device identifier may convey
        information to Eggschain about how you browse and use the Solutions. A
        device identifier may remain persistently on your device to enhance your
        navigation within the Solutions. Some features of the Solutions may not
        function properly if use or availability of device identifiers is
        impaired or disabled.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        How We Use Your Information{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        We process your personal information with your consent or as needed to
        provide you Solutions. We may also use your personal information to
        comply with legal obligations, operate our business, protect the vital
        interests of you, our customers, or the public, or for other legitimate
        interests of Eggschain as described in this Privacy Policy. More
        specifically, we may use your personal information to:
      </Typography>
      <ul>
        <li className={classes.blackText}>
          <span className={classes.boldText}>
            {" "}
            Optimize and improve the Solutions –
          </span>
          We continually try to improve the Solutions based on the information
          and feedback we receive from you, including by optimizing the content
          on the Solutions.
        </li>
        <li className={classes.blackText}>
          <span className={classes.boldText}>
            {" "}
            Personalize the user experience – –
          </span>
          We may use your information to measure engagement with the Solutions,
          and to understand how you and our other users interact with and use
          the Solutions and other resources we provided.{" "}
        </li>
        <li className={classes.blackText}>
          <span className={classes.boldText}>Improve customer service –</span>
          Your information helps us to more effectively develop the Solutions
          and respond to your support needs.
        </li>
        <li className={classes.blackText}>
          <span className={classes.boldText}> Process transactions – </span>
          We may use the information you provide about yourself to fulfill your
          requests and orders. We do not share this information with outside
          parties except to the extent necessary to provide the Solutions and
          related offerings.{" "}
        </li>
        <li className={classes.blackText}>
          <span className={classes.boldText}> To send periodic emails – </span>
          The email address you provide through our contact forms, will be used
          to send information and updates pertaining to the Solutions. It may
          also be used to respond to your inquiries or other requests. If you
          opt in to our mailing list, you may receive emails that include
          Eggschain news, updates, related product and service information, and
          marketing material. If at any time you would like to unsubscribe from
          receiving future emails, we include detailed unsubscribe instructions
          at the bottom of each email or you may contact us via the contact
          information below.{" "}
        </li>
      </ul>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        How We Share Your Information{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        We share your information with our partners, service providers,
        contractors, agents and third party vendors as needed to fulfill
        Solutions. Please note that our partners may contact you as necessary to
        obtain additional information about you, facilitate any use of the
        Solutions, or respond to a request you submit. Third-party vendors who
        provide product, services or functions on our behalf may include
        business analytics companies, customer service vendors, communications
        service vendors, marketing vendors, and security vendors. We may also
        authorize third-party vendors to collect information on our behalf,
        including as necessary to operate features of the Solutions or to
        facilitate the delivery of online advertising tailored to your
        interests. Third-party vendors have access to and may collect personal
        information only as needed to perform their functions, may only use
        personal information consistent with this Privacy Policy and other
        appropriate confidentiality and security measures, and are not permitted
        to share or use the information for any other purpose.
        <br />
        We also may share your information:
        <br />
        <li className={classes.blackText}>
          {" "}
          In response to subpoenas, court orders, or other legal process; to
          establish or exercise our legal rights; to defend against legal
          claims; or as otherwise required by law. In such cases we reserve the
          right to raise or waive any legal objection or right available to us.
        </li>
        <li className={classes.blackText}>
          {" "}
          When we believe it is appropriate to investigate, prevent, or take
          action regarding illegal or suspected illegal activities; to protect
          and defend the rights, interests, or safety of our company or the
          Solutions, our customers, or others; or in connection with our Terms
          of Service and other agreements.
        </li>
        <li className={classes.blackText}>
          {" "}
          In connection with a corporate transaction, such as a divestiture,
          merger, consolidation, or asset sale, or in the unlikely event of
          bankruptcy.
        </li>
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.blackText}>
        Other than as set out above, we will attempt to notify you when your
        personal information will be shared with third parties.
      </Typography>

      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Personal Information You Post in Public Areas.{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        When you post a message in a Eggschain forum, chat room, review, or
        customer feedback, the information you post may be accessible to other
        users of the Service and the public. If you post personal information
        anywhere on the Solutions that is accessible to other users or the
        public, you are advised that such personal information can be read,
        collected, used, or disseminated by others and could be used to send you
        unsolicited information or otherwise. Accordingly, you assume full
        responsibility for posting such information and agree that Eggschain is
        not responsible in any way for personal information you choose to post
        in these public areas.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Non-Personal Information.{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        We may publish, share, distribute, or disclose non-personal information,
        which may include personal information that has been aggregated with
        information from other users or otherwise de-identified in a manner that
        does not allow such data about you to be separated from the aggregate
        data and identified as originating from you, to third parties, including
        Eggschain partners, sponsors, and advertisers. Such non-personal
        information may help Eggschain identify and analyze training,
        demographic, and psychographic trends and information, and report to
        third parties how many people saw, visited, or clicked on certain
        content, areas of the Solutions, ads, or other materials. We may also
        use such data for research purposes.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        How We Store and Secure Your Information{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        Personal information collected by Eggschain may be stored and processed
        in your region, in the United States, and in any other country where
        Eggschain or its affiliates, subsidiaries, or service providers operate
        facilities. Eggschain will retain your information as long as necessary
        for the purposes outlined in this Privacy Policy and for a commercially
        reasonable time thereafter for backup, archival, fraud prevention or
        detection or audit purposes, or as otherwise required by law.
        <br />
        <br />
        Eggschain takes technological and organizational measures to protect
        your personal information against loss, theft, and unauthorized access,
        use, disclosure or modification.
        <br />
        <br />
        Eggschain complies with applicable data protection laws, including
        applicable security breach notification requirements.
        <br />
        <br />
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Accessing and Updating Your Information{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        To the extent provided by the law of your jurisdiction, you may (i) have
        the right to access certain personal information we maintain about you,
        (ii) request certain information regarding our disclosure of personal
        information to third parties for their direct marketing purposes, (iii)
        request that we update or correct inaccuracies in that information, (iv)
        object to our use of your personal information, (v) ask us to block or
        delete your personal information from our database, and (vi) request to
        download the information you have shared on the Solutions. You may make
        these requests and any other inquiries about this Privacy Policy by
        emailing{" "}
        <span className={classes.boldText}>feedback@eggschain.com </span>. Any
        such requests are subject to the protection of other individuals’ rights
        and applicable law. Additionally, to help protect your privacy and
        maintain security, we may take steps to verify your identity before
        granting you access to the information. To the extent permitted by
        applicable law, a charge may apply before we provide you with a copy of
        any of your personal information that we maintain.
      </Typography>
      <br />
      <br />
      <Typography variant="h7" className={classes.borderAndBold}>
        {" "}
        Additional Privacy Information{" "}
      </Typography>
      <br />
      <Typography variant="h7" className={classes.blackText}>
        <span className={classes.borderBottom}>Data Transfer.</span> Our
        databases are currently located in the United States. Eggschain makes no
        claim that its Solutions is appropriate or lawful for use or access
        outside the United States. If you access the Solutions from outside the
        United States, you are consenting to the transfer of your personal
        information from your location to the United States. You are solely
        responsible for complying with all local laws, rules and regulations
        regarding online conduct and access to the Solutions. By sending us your
        information, you further consent to its storage within the United
        States.
        <br />
        <br />
        <span className={classes.borderBottom}>
          {" "}
          Collection of Data from Children.
        </span>{" "}
        The Solutions is not directed to children, and you may not use the
        Solutions or provide any personal information to Eggschain if you are
        under the age of 13 or if you are not old enough to consent to the
        processing of your personal information in your country.
        <br />
        <br />
        <span className={classes.borderBottom}>
          {" "}
          Your California Privacy Rights.
        </span>{" "}
        California Civil Code Section 1798.83 permits our customers who are
        California residents to request certain information regarding our
        disclosure of personal information to third parties for their direct
        marketing purposes. To make such a request, please e-mail us or write to
        us at the addresses below.
        <br />
        <br />
        <span className={classes.borderBottom}> How to Contact Us.</span> You
        can e-mail us at feedback@eggschain.com
      </Typography>
      {/* <div className={classes.buttonsDiv}>
        <Fab
          variant="extended"
          aria-label="Delete"
          color="primary"
          className={classes.acceptButton}
          onClick={acceptHandler}
          className={classes.button}
          onClick={approveHandle}
          disabled={btndisabler}
        >
          {approveloader == true ? (
                          <CircularProgress size={19} color="#00fe9b" />
                        ) : (
                          <p>Approve</p>
                        )}
          <FcApproval className={classes.acceptIcon} />
          Accept
        </Fab>
        <Fab
          variant="extended"
          aria-label="Delete"
          className={classes.declineButton}
          onClick={declineHandler}
          className={classes.button}
          onClick={approveHandle}
          disabled={btndisabler}
        >
          {approveloader == true ? (
                          <CircularProgress size={19} color="#00fe9b" />
                        ) : (
                          <p>Approve</p>
                        )}
          <FcCancel className={classes.declineIcon} />
          Decline
        </Fab>
      </div> */}
    </>
  );
}
export default PrivacyPolicyModal;
