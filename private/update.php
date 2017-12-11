<?php
	require_once "../vendor/autoload.php";

	$env = file_get_contents('../.env_config');
	$variables = explode(PHP_EOL, $env);
	$linkedin_id = substr($variables[0], strlen('LINKEDIN_ID='));
	$linkedin_secret = substr($variables[0], strlen('LINKEDIN_SECRET='));

	if (empty($linkedin_id) || empty($linkedin_secret)) {
		echo 'Les informations api linkedin sont introuvables.<br/>';
		exit();
	}

	$linkedIn = new Happyr\LinkedIn\LinkedIn($linkedin_id, $linkedin_secret);
	
	if ($linkedIn->hasError()) {
		echo 'User canceled the login.<br/>';
		exit();
	}
	
	if ($linkedIn->isAuthenticated())
	{
		$data = $linkedIn->get('v1/people/~:'.
			'('.
				'id,'.
				'first-name,'.
				'last-name,'.
				'headline,'.
				'picture-url,'.
				'industry,'.
				'summary,'.
				'specialties,'.
				'positions:('.
					'id,'.
					'title,'.
					'summary,'.
					'start-date,'.
					'end-date,'.
					'is-current,'.
					'company:('.
						'id,'.
						'name,'.
						'type,'.
						'size,'.
						'industry,'.
						'ticker)'.
				'),'.
				'educations:('.
					'id,'.
					'school-name,'.
					'field-of-study,'.
					'start-date,'.
					'end-date,'.
					'degree,'.
					'activities,'.
					'notes),'.
				'associations,'.
				'interests,'.
				'num-recommenders,'.
				'date-of-birth,'.
				'publications:('.
					'id,'.
					'title,'.
					'publisher:(name),'.
					'authors:(id,name),'.
					'date,'.
					'url,'.
					'summary),'.
				'patents:('.
					'id,'.
					'title,'.
					'summary,'.
					'number,'.
					'status:(id,name),'.
					'office:(name),'.
					'inventors:(id,name),'.
					'date,'.
					'url),'.
				'languages:('.
					'id,'.
					'language:(name),'.
					'proficiency:(level,name)),'.
				'skills:('.
					'id,'.
					'skill:(name)),'.
				'certifications:('.
					'id,'.
					'name,'.
					'authority:(name),'.
					'number,'.
					'start-date,'.
					'end-date),'.
				'courses:('.
					'id,'.
					'name,'.
					'number),'.
				'recommendations-received:('.
					'id,'.
					'recommendation-type,'.
					'recommendation-text,'.
					'recommender),'.
				'honors-awards,'.
				'three-current-positions,'.
				'three-past-positions,'.
				'volunteer:('.
					'volunteer-experiences:('.
						'id,'.
						'role,'.
						'organization:(name),'.
						'cause:(name)),'.
				')'.
			')'
		);
	
		file_put_contents('../public/app/data.json', json_encode($data));

		echo 'Le fichier data a été mis à jours.<br/>';
		// exit();

	}

	//
	$scope = 'r_fullprofile,r_emailaddress,w_share';
	$url = $linkedIn->getLoginUrl(array('scope' => $scope));
	echo '<a href="'.$url.'">Sign in LinkedIn</a>';