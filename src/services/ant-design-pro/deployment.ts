import { Server } from '@/services/ant-design-pro/environment';
import { Paginate, Project } from '@/services/ant-design-pro/project';
import { request } from '@@/exports';

export type Deployment = {
  id: number;
  project_id: number;
  version: string;
  comment: string;
  status: string;
  params: Record<string, boolean>;
  results: CommandResult[];
  environments: number[];
  created_at: string;
  updated_at: string;
};

export type CommandResult = {
  step: string;
  command: number;
  time_consuming: number;
  servers: Record<string, CommandOutput>;
};

export type CommandOutput = Server & {
  outputs: string;
  status: string;
  time: number;
};

export async function getDeployments(params: Record<any, any>) {
  const result = await request<Paginate<Deployment>>('/api/deployment/list', { params });
  result.page = params.page;
  result.page_size = params.pageSize;
  return result;
}

export async function createDeployment(data: Record<any, any>) {
  return await request<Deployment>('/api/deployment/create', { data, method: 'POST' });
}

export async function getDeploymentDetail(id: any) {
  return await request<{
    data: {
      deployment: Deployment;
      project: Project;
    };
  }>('/api/deployment/detail', { params: { id } }).then((res) => res.data);
}
