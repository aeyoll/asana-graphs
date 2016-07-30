<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Asana\Client;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        return $this->render('default/index.html.twig');
    }

    /**
     * @Route("/api/projects")
     */
    public function projectsAction(Request $request)
    {
        $client = $this->getClient();

        $data = $client->projects->findAll([
            'workspace' => $this->container->getParameter('asana_workspace_id')
        ]);

        $projects = [];

        foreach ($data as $project) {
            $projects[] = $project;
        }

        return new JsonResponse($projects);
    }

    /**
     * @Route("/api/projects/{project_id}/tasks")
     */
    public function tasksAction(Request $request, $project_id)
    {
        $client = $this->getClient();

        $data = $client->tasks->findAll([
            'project' => $project_id,
        ], [
            'fields'  => [
                'created_at',
                'completed',
                'completed_at'
            ]
        ]);

        $tasks = [];

        foreach ($data as $task) {
            $tasks[] = $task;
        }

        return new JsonResponse($tasks);
    }

    private function getClient()
    {
        Client::$DEFAULTS['page_size'] = 100;
        $token = $this->container->getParameter('asana_client_token');

        return Client::accessToken($token);
    }
}
