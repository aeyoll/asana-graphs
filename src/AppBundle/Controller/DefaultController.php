<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        \Asana\Client::$DEFAULTS['page_size'] = 100;

        $client = $this->getClient();

        $projects = $client->projects->findAll([
            'workspace' => $this->container->getParameter('asana_workspace_id')
        ]);

        $data = [];

        foreach ($projects as $project) {
            $tasks = $client->tasks->findAll([
                'project' => $project->id,
            ], [
                'fields'  => [
                    'created_at',
                    'completed',
                    'completed_at'
                ]
            ]);

            $data[] = [
                'project' => $project,
                'tasks'   => $tasks
            ];

            break;
        }

        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..'),
            'projects' => $projects,
            'data'     => $data,
        ]);
    }

    private function getClient()
    {
        return \Asana\Client::accessToken($this->container->getParameter('asana_client_token'));
    }
}
