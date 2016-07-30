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

        // Sorting tasks
        usort($tasks, [$this, 'sortByDate']);
        $firstTask = $tasks[0];
        $lastTask  = $tasks[count($tasks) - 1];

        $begin = new \DateTime($firstTask->created_at);
        $end   = new \DateTime($lastTask->created_at);

        $interval = \DateInterval::createFromDateString('1 day');
        $period = new \DatePeriod($begin, $interval, $end);

        $result = [];

        foreach ($period as $dt) {
            $today = $dt->format('Y-m-d');
            $result[$today] = [];

            foreach ($tasks as $task) {
                $taskCreatedAt = new \DateTime($task->created_at);
                $taskCreatedAt = $taskCreatedAt->format('Y-m-d');

                if (!array_key_exists('count', $result[$today])) {
                    $result[$today]['count'] = 0;
                }

                if (!array_key_exists('completed', $result[$today])) {
                    $result[$today]['completed'] = 0;
                }

                if ($taskCreatedAt <= $today) {
                    $result[$today]['count']++;
                }

                if (!is_null($task->completed_at)) {
                    $taskCompletedAt = new \DateTime($task->completed_at);
                    $taskCompletedAt = $taskCompletedAt->format('Y-m-d');

                    if ($taskCompletedAt < $today) {
                        $result[$today]['completed']++;
                    }
                }

                $result[$today]['remaining'] = $result[$today]['count'] - $result[$today]['completed'];
            }
        }

        return new JsonResponse($result);
    }

    private function getClient()
    {
        Client::$DEFAULTS['page_size'] = 100;
        $token = $this->container->getParameter('asana_client_token');

        return Client::accessToken($token);
    }

    private function sortByDate($arr1, $arr2)
    {
        return strcmp($arr1->created_at, $arr2->created_at);
    }
}
